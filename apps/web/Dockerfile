# syntax=docker/dockerfile:1

# ---------------- PRUNER (Bun) ----------------
FROM oven/bun:1.1-alpine AS pruner

# Install Node.js (required by Turbo)
RUN apk add --no-cache nodejs

WORKDIR /app

ENV TURBO_TELEMETRY_DISABLED=1

# Copy package files first (use bun.lockb, not bun.lock symlink)
COPY package.json bun.lockb turbo.json ./
COPY apps/api/package.json ./apps/api/
COPY apps/web/package.json ./apps/web/
COPY apps/docs/package.json ./apps/docs/
COPY packages/database/package.json ./packages/database/
COPY packages/ui/package.json ./packages/ui/
COPY packages/types/package.json ./packages/types/
COPY packages/validations/package.json ./packages/validations/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/typescript-config/package.json ./packages/typescript-config/

# Install dependencies (this installs turbo from package.json)
RUN bun install

# Copy all files
COPY . .

# Run prune with locally installed turbo
RUN bunx turbo prune web --docker

# ---------------- INSTALLER (Bun) ----------------
FROM oven/bun:1.1-alpine AS installer
WORKDIR /app

# First install dependencies (as they change less often)
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/bun.lockb ./

# Skip Prisma's Node.js version check (we use Bun)
ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

RUN bun install --frozen-lockfile

# ---------------- BUILDER (Bun) ----------------
FROM oven/bun:1.1-alpine AS builder
WORKDIR /app

COPY --from=installer /app/node_modules ./node_modules
COPY --from=pruner /app/out/full/ .

RUN cd apps/web && NEXT_PRIVATE_SKIP_PATCHING=1 bun run build

# ---------------- RUNNER (Node) ----------------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

USER nextjs
EXPOSE 3000

CMD ["node", "apps/web/server.js"]
