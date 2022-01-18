 FROM node:17

 WORKDIR /home/services

 COPY ./package.json .
 COPY . .
 COPY ./yarn.lock .

 RUN yarn
 CMD yarn start:dev
