# --- СТАДИЯ 1: Базовый образ ---
    FROM node:22-alpine AS base
    WORKDIR /app
    RUN apk add --no-cache libc6-compat
    
    # --- СТАДИЯ 2: Установка зависимостей ---
    FROM base AS deps
    COPY package.json package-lock.json ./
    RUN npm ci
    
    # --- СТАДИЯ 3: Сборка приложения (Builder) ---
    FROM base AS builder
    COPY --from=deps /app/node_modules ./node_modules
    COPY . .
    
    # ВАЖНО: Объявляем ARG, которые приходят из GitHub Actions build-args
    ARG BASE_URL
    ARG GOOGLE_GENERATIVE_AI_API_KEY
    ARG NEXT_PUBLIC_TMDB_TOKEN
    ARG NEXT_PUBLIC_RAWG_API
    
    # Передаем их в ENV, чтобы Next.js увидел их во время 'npm run build'
    ENV BASE_URL=$BASE_URL
    ENV GOOGLE_GENERATIVE_AI_API_KEY=$GOOGLE_GENERATIVE_AI_API_KEY
    ENV NEXT_PUBLIC_TMDB_TOKEN=$NEXT_PUBLIC_TMDB_TOKEN
    ENV NEXT_PUBLIC_RAWG_API=$NEXT_PUBLIC_RAWG_API
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    
    RUN npm run build
    
    # --- СТАДИЯ 4: Финальный образ (Runner) ---
    FROM node:22-alpine AS runner
    WORKDIR /app
    
    ENV NODE_ENV=production
    ENV NEXT_TELEMETRY_DISABLED=1
    ENV PORT=3000
    ENV HOSTNAME=0.0.0.0
    
    # Настройка безопасности (запуск не от root)
    RUN addgroup --system --gid 1001 nodejs \
        && adduser --system --uid 1001 nextjs
    
    # Копируем только необходимые файлы из стадии builder
    COPY --from=builder /app/public ./public
    COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
    COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
    
    USER nextjs
    EXPOSE 3000
    
    # Хелтчек: проверяет доступность страницы /roadmaps внутри контейнера
    HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
        CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/roadmaps').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"
    
    # Запуск приложения через standalone сервер
    CMD ["node", "server.js"]
    