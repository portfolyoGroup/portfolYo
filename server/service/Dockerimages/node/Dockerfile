#FROM ubuntu
FROM node
#RUN apt update && apt install nodejs -y && apt install npm -y
ARG PROJECT_NAME

COPY ./tmp/${PROJECT_NAME}/package*.json /app/

WORKDIR /app

COPY ./tmp/${PROJECT_NAME} /app

RUN npm cache clean --force && make

ENTRYPOINT ["npm"]

CMD ["run", "dev"]