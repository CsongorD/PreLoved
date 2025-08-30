### Download maven img ###
FROM maven:amazoncorretto AS build
WORKDIR /buildmaven
COPY backend/pom.xml .
COPY backend/src ./src
RUN mvn -f pom.xml clean package -DskipTests

###
FROM eclipse-temurin:21
WORKDIR /app
COPY --from=build /buildmaven/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]