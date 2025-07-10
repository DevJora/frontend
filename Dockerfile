# syntax=docker/dockerfile:1

# Étape 1 : Build Angular
FROM node:20 AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx ng build frontend --configuration production

# Étape 2 : Servir avec NGINX
FROM nginx:alpine
COPY --from=build /app/dist/frontend /usr/share/nginx/html
EXPOSE 80
