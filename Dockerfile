# ============================================
# Stage 1: Dependencies Installation
# ============================================

FROM oven/bun:1 AS dependencies

WORKDIR /app

# Copy dependency files
COPY package.json bun.lock* ./

# Install dependencies
RUN bun install

# ============================================
# Stage 2: Build Next.js
# ============================================

FROM oven/bun:1 AS builder

WORKDIR /app

# Copy node_modules dari stage sebelumnya
COPY --from=dependencies /app/node_modules ./node_modules

# Copy source code
COPY . .

ENV NODE_ENV=production

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_AUTH_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_AUTH_URL=$NEXT_PUBLIC_AUTH_URL

# Build Next.js
RUN bun run build

# ============================================
# Stage 3: Runner (tetap pakai Node untuk stabilitas)
# ============================================

FROM node:20-slim AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Install dependency untuk sharp (kalau dibutuhkan)
# RUN apt-get update && apt-get install -y libvips && rm -rf /var/lib/apt/lists/*

# Copy hasil build standalone
COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]