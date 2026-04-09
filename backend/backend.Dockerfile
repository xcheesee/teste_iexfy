FROM node:25-alpine

WORKDIR /api

COPY . .

EXPOSE 3000

CMD [ "node", "main.js"]