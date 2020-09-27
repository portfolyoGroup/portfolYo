FROM ubuntu

#RUN apk update && apk upgrade && apk add --update nodejs nodejs-npm && apk add --update make && apk add --update python krb5 krb5-libs gcc make g++ krb5-dev
RUN apt update && apt install nodejs -y && apt install npm -y
ARG PROJECT_NAME

COPY ./tmp/${PROJECT_NAME}/package*.json /app/

WORKDIR /app

COPY ./tmp/${PROJECT_NAME} /app
#
#RUN make
#
#ENTRYPOINT ["npm"]
#
#CMD ["run", "dev"]