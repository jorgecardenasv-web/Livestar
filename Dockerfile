FROM node:24-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
RUN corepack enable pnpm && pnpm i --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app

# Install Playwright system dependencies for Alpine
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    fontconfig \
    font-noto \
    font-noto-extra \
    wget \
    unzip

# Descargar e instalar fuentes Montserrat desde GitHub
RUN mkdir -p /usr/share/fonts/truetype/montserrat && \
    cd /usr/share/fonts/truetype/montserrat && \
    wget -O montserrat.zip "https://github.com/JulietaUla/Montserrat/archive/refs/heads/master.zip" && \
    unzip -j montserrat.zip "Montserrat-master/fonts/ttf/*.ttf" && \
    rm montserrat.zip && \
    fc-cache -fv

ENV DATABASE_URL=postgresql://user:password@localhost:5432/db
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma Client
RUN corepack enable pnpm && pnpm prisma generate

# Install Playwright browsers (without --with-deps since we're on Alpine)
RUN corepack enable pnpm && npx playwright install chromium

RUN corepack enable pnpm && pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install Playwright dependencies for Chromium and fonts
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    font-noto-emoji \
    wqy-zenhei \
    fontconfig \
    font-noto \
    font-noto-extra \
    wget \
    unzip

# Descargar e instalar fuentes Montserrat desde GitHub
RUN mkdir -p /usr/share/fonts/truetype/montserrat && \
    cd /usr/share/fonts/truetype/montserrat && \
    wget -O montserrat.zip "https://github.com/JulietaUla/Montserrat/archive/refs/heads/master.zip" && \
    unzip -j montserrat.zip "Montserrat-master/fonts/ttf/*.ttf" && \
    rm montserrat.zip && \
    fc-cache -fv

ENV NODE_ENV=production
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Create tmp directory for Chromium with correct permissions
RUN mkdir -p /tmp && chown -R nextjs:nodejs /tmp

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
