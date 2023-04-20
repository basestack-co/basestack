FROM node:16 AS builder

WORKDIR /app
RUN yarn global add turbo@1.7.0
COPY . .
RUN turbo prune --scope=@basestack/feature-flags --docker

FROM node:16 AS installer

WORKDIR /app
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn --network-timeout 1000000

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

RUN npx prisma generate
RUN yarn deploy:feature-flags

ARG APP_VERSION
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION

# RUN yarn build

FROM node:16 AS runner
WORKDIR /app

RUN yarn global add prisma
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# COPY --from=builder --chown=nextjs:nodejs /app/scripts/docker-start.sh ./
# COPY --from=builder --chown=nextjs:nodejs /app/packages/database/prisma ./prisma

COPY --from=installer /app/apps/feature-flags/next.config.js .
COPY --from=installer /app/apps/feature-flags/package.json .

ENV PORT 3000
EXPOSE 3000

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/.next/static ./apps/feature-flags/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/feature-flags/public ./apps/feature-flags/public

CMD node apps/feature-flags/server.js
