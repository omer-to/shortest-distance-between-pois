FROM node:14-alpine

WORKDIR /usr/project

COPY . .

EXPOSE 4000

RUN   npm i --unsafe-perm && \
      rm -rf src

ENTRYPOINT [ "npm", "start" ]