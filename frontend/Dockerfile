FROM node:alpine
RUN apk update && apk add bash
RUN apk add g++ make python

RUN mkdir -p /frontend/src/
RUN mkdir -p /frontend/assets/
WORKDIR /frontend/

COPY package.json /frontend/
COPY App.js /frontend/
COPY app.json /frontend/
COPY babel.config.js /frontend/
COPY .env /frontend/

RUN npm install -f
RUN npm install expo-cli -g --unsafe-perm=true --allow-root

CMD [ "npm", "start" ]