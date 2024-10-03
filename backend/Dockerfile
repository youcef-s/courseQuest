FROM node:20

WORKDIR /backend

RUN apt-get update -y

COPY ./*.json ./

RUN npm i

COPY ./ ./

RUN npm run build

CMD ["npm", "run", "start:prod"]
