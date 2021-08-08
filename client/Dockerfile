FROM node:14-alpine

WORKDIR /usr/project

COPY . .

RUN   npm i --unsafe-perm && \
      rm -rf src 