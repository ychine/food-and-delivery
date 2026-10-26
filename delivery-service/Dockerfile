FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY server.js ./
COPY common.js ./

USER node

EXPOSE 3006

CMD ["npm", "start"]
