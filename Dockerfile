FROM node:current-slim
WORKDIR /api
COPY package.json /api
COPY yarn.lock /api
RUN yarn install
COPY ./packages/api /api/packages/api
COPY ./packages/storage /api/packages/storage
CMD yarn start:api
EXPOSE 3000