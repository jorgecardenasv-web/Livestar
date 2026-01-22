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
ENV DATABASE_URL=postgresql://user:password@localhost:5432/db
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

# Generate Prisma Client
RUN corepack enable pnpm && pnpm prisma generate

RUN corepack enable pnpm && pnpm run build

# Extract @sparticuz/chromium to a known location for copying
RUN mkdir -p /tmp/chromium-package && \
    cp -rL /app/node_modules/@sparticuz/chromium /tmp/chromium-package/ || \
    cp -rL /app/node_modules/.pnpm/@sparticuz+chromium*/node_modules/@sparticuz/chromium /tmp/chromium-package/chromium

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Install dependencies for @sparticuz/chromium
# @sparticuz/chromium trae su propio binario de Chromium
# Solo necesitamos las librerías del sistema
RUN apk add --no-cache \
    ca-certificates \
    ttf-freefont \
    nss \
    freetype \
    harfbuzz

ENV NODE_ENV=production
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

# Automatically leverage output traces to redufrom extracted location
COPY --from=builder --chown=nextjs:nodejs /tmp/chromium-package
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy @sparticuz/chromium package completely (pnpm structure)
# Necesitamos copiar desde la estructura de pnpm porque standalone no incluye los archivos .br
COPY --from=builder --chown=nextjs:nodejs /app/node_modules/.pnpm/@sparticuz+chromium@143.0.4/node_modules/@sparticuz/chromium ./node_modules/@sparticuz/chromium

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
