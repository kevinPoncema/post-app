# backend.dockerfile
FROM node:latest

WORKDIR /backend

COPY backend/ .

RUN npm install

CMD ["npm", "run", "dev"]
