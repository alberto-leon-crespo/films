FROM node:12.13-alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm install --only=development

RUN npm -v
RUN node -v

COPY . .

RUN npm run build

FROM node:12.13-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

ENV WAIT_VERSION 2.7.2
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait

CMD ["npm", "run", "start:prod"]