FROM node:18.17.1-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

USER node

EXPOSE 3000

CMD ["npm", "run", "start:prod"]