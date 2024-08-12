FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=@basestack/forms --docker

# Add lockfile and package.json's of isolated subworkspace
FROM node:alpine AS installer
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
RUN yarn deploy:forms

ARG APP_VERSION
ENV NEXT_PUBLIC_APP_VERSION=$APP_VERSION

FROM node:alpine AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/forms/next.config.js .
COPY --from=installer /app/apps/forms/package.json .

ENV PORT 3000
EXPOSE 3000

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/forms.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/forms/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/forms/public ./apps/web/public

CMD node apps/formsserver.js
