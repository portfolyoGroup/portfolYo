FROM ubuntu

RUN apt update && apt install nodejs -y && apt install npm -y
ARG PROJECT_NAME

COPY ./tmp/${PROJECT_NAME}/package*.json /app/

WORKDIR /app

COPY ./tmp/${PROJECT_NAME} /app

RUN make

ENTRYPOINT ["npm"]

CMD ["run", "dev"]