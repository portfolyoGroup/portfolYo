FROM node:14.11.0

ARG PROJECT_NAME

COPY ./tmp/${PROJECT_NAME}/package*.json /app/

WORKDIR /app

COPY ./tmp/${PROJECT_NAME} /app

RUN make

ENTRYPOINT ["npm"]

CMD ["run", "dev"]