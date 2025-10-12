FROM node:22-alpine AS builder

WORKDIR /app
COPY package*.json .

RUN npm ci

COPY . /app

RUN npm run build

FROM caddy:alpine AS front

COPY --from=builder /app/dist /usr/share/caddy
