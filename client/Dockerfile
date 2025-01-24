FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

COPY yarn.lock* ./

RUN yarn install

COPY . .

EXPOSE 8081 19006

CMD ["npm", "run", "web"]