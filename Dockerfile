# ---- Base Stage ----
# Install dependencies for the entire monorepo
FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --prod=false

# ---- Builder Stage ----
# Build all applications and packages
FROM base AS builder

COPY . .
RUN pnpm build

# ---- Frontend Stage ----
# Creates a production-ready image for a Next.js frontend app
FROM base AS frontend

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /app

COPY --from=builder /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

# Ensure the server can start
EXPOSE 3000
CMD node apps/${APP_NAME}/server.js

# ---- Backend Stage ----
# Creates a production-ready image for a Node.js backend service
FROM base AS backend

ARG APP_NAME
ENV APP_NAME=${APP_NAME}

WORKDIR /app

# Copy built code and necessary files from the builder stage
COPY --from=builder /app/apps/${APP_NAME}/dist ./dist
COPY --from=builder /app/apps/${APP_NAME}/package.json ./package.json

EXPOSE 3000
CMD ["node", "dist/index.js"]
