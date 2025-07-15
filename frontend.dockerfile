# frontend.dockerfile
FROM node:latest

WORKDIR /frontend

COPY frontend/ .

RUN npm install

CMD ["npm", "run", "serve"]
