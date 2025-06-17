FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./
RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["npm", "start"]
