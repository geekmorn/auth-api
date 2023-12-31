FROM node:20.5-alpine AS base
RUN npm i -g pnpm


FROM base AS development
WORKDIR /app
COPY --chown=node:node pnpm-lock.yaml ./
RUN pnpm fetch --prod
COPY --chown=node:node . .
RUN pnpm install
USER node


FROM base As builder
WORKDIR /app
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=development /app/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm build
RUN pnpm install --prod
USER node


FROM base As production
WORKDIR /app
COPY --chown=node:node --from=builder /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist