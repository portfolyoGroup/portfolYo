FROM node:12

ARG PROJECT_NAME

COPY ./tmp/${PROJECT_NAME}/package*.json /app/

WORKDIR /app

COPY ./tmp/${PROJECT_NAME} /app

RUN npm install && npm run client-install

ENTRYPOINT ["npm"]
CMD ["run", "dev"]