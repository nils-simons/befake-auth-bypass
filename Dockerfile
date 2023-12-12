FROM node:20

WORKDIR /befake

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7630

CMD ["node", "index.js"]