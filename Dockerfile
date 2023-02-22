FROM node:18-alpine AS builder
ENV NODE_ENV production
WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm ci --legacy-peer-deps --include=dev

COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
