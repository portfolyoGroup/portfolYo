FROM ubuntu:latest

ARG PROJECT_NAME

RUN apt -y update

RUN	apt install -y

RUN	apt -y install gcc

RUN	apt install -y tmate locales-all && apt-get -y install openssh-client && ssh-keygen -b 2048 -t rsa -f ~/.ssh/id_rsa -q -N ""

COPY ./${PROJECT_NAME}.c .

RUN gcc -o app ${PROJECT_NAME}.c

#CMD tmate new-session -s my_session sh -c './app'
CMD tmate -k tmk-XrCnVXNXQEky3Oh9vzjpLmjDGe -S /tmp/tmate.sock -k tmk-XrCnVXNXQEky3Oh9vzjpLmjDGe -n test  new-session -s helloc  -d sh -c "./app"