FROM node:20-alpine As development

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 5000

CMD ["npm", "run", "start:dev"]
