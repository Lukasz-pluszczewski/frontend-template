FROM oven/bun:1.0.0 AS builder
WORKDIR /app

COPY package.json .
COPY bun.lockb .
RUN bun i

COPY . .
RUN bun run build

FROM nginx:1.21.0-alpine as production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]
