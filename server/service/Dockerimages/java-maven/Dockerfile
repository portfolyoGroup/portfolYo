FROM maven:3.6.3-jdk-11-slim AS MAVEN_TOOL_CHAIN

ARG PROJECT_NAME

WORKDIR /app

COPY ./tmp/${PROJECT_NAME}/pom.xml /app

COPY ./tmp/${PROJECT_NAME}/src/* /app/

#RUN make

RUN mvn install && ls /app/target

#FROM tomcat:10.0.0-M8-jdk11-openjdk-slim-buster
#
#COPY --from=MAVEN_TOOL_CHAIN /app/target/wizard*.jar $CATALINA_HOME/webapps/app.jar


FROM openjdk:11.0.7-jre-slim-buster

ARG PROJECT_NAME

COPY --from=MAVEN_TOOL_CHAIN /app/target/${PROJECT_NAME}-1.0-SNAPSHOT.jar app.jar

ENTRYPOINT ["java"]

CMD ["-jar", "app.jar"]