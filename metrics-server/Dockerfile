FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate
RUN pnpm fetch || true
COPY . .
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm build

FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 9101
CMD ["node","dist/index.js"]
