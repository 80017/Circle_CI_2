FROM node:8.1.2

ADD . /usr/src/app/

WORKDIR /usr/src/app/

RUN npm install
RUN npm install rethinkdb-job-queue -s
ENV RDB_HOST=rethinkdb

EXPOSE 3030

CMD NODE_ENV=production npm start
