FROM node:20 AS base

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

FROM node:20 AS production

WORKDIR /app

COPY --from=base /app/package.json ./
COPY --from=base /app/package-lock.json ./
COPY --from=base /app/.next ./.next
COPY --from=base /app/public ./public
COPY --from=base /app/prisma ./prisma

RUN npm install --only=production

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "start"]