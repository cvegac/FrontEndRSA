FROM node:16.10.0 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

#Segunda Etapa
FROM nginx:1.24.0

COPY --from=build-step /app/dist/examen-ibm /usr/share/nginx/html