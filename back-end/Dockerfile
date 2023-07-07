
FROM maven:3.6.0-jdk-11-slim AS build
COPY src /home/app/src
COPY pom.xml /home/app
RUN mvn -f /home/app/pom.xml clean package


FROM eclipse-temurin:11

LABEL mentainer="File-demo"

WORKDIR /app

COPY --from=build /home/app/target/file-demo-0.0.1-SNAPSHOT.jar /app/file-demo.jar

ENTRYPOINT ["java", "-jar", "file-demo.jar"]

#Build java mvn clean package