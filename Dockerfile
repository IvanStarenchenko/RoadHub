# ---------- Этап 1: Base (Общая база) ----------
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ---------- Этап 2: Dependencies (Установка зависимостей) ----------
FROM base AS deps
WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install --frozen-lockfile; \
  else echo "Error: Lockfile not found." && exit 1; \
  fi

# ---------- Этап 3: Builder (Сборка приложения) ----------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Фикс зависимостей
RUN npm install cheerio

# Жестко прописываем окружение для сборки
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    BASE_URL=https://tymurmustafaiev.github.io/roadhub

# Сборка проекта
RUN npm run build

# ---------- Этап 4: Runner (Финальный образ) ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0" \
    BASE_URL=https://tymurmustafaiev.github.io/roadhub \
    NODE_OPTIONS="--dns-result-order=ipv4first"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
RUN mkdir .next && chown nextjs:nodejs .next

# Копируем standalone билд
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]