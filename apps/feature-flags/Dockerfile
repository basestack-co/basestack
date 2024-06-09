FROM node:18-alpine AS base

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app

RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@basestack/feature-flags --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock

RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN yarn turbo build --no-cache --filter=@basestack/feature-flags

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/feature-flags/next.config.js .
COPY --from=installer /app/apps/feature-flags/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/.next/static ./apps/feature-flags/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/public ./apps/feature-flags/public

ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000

CMD node apps/feature-flags/server.js
