# --- build ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* pnpm-lock.yaml* .npmrc* ./
RUN corepack enable && corepack prepare pnpm@9.7.0 --activate
RUN pnpm fetch || true
COPY . .
RUN pnpm install --frozen-lockfile || pnpm install
RUN pnpm build

# --- runtime ---
FROM node:20-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 3000
CMD ["node","dist/main.js"]
