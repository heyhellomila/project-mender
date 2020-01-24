FROM node:alpine

RUN mkdir -p /backend/src/
WORKDIR /backend/
RUN mkdir logs/

COPY package.json /backend/
COPY tsconfig.json /backend/
RUN npm install

CMD [ "npm", "run", "dev" ]