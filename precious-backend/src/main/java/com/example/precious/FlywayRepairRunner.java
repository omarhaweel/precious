package com.example.precious;

import org.flywaydb.core.Flyway;

import io.github.cdimascio.dotenv.Dotenv;

/**
 * One-time runner to fix Flyway checksum mismatch (e.g. after editing an already-applied migration).
 * Run from project root: {@code cd precious-backend && mvn exec:java -Dexec.mainClass="com.example.precious.FlywayRepairRunner"}
 */
public class FlywayRepairRunner {

    public static void main(String[] args) {
        loadEnv();
        String url = System.getProperty("DATABASE_URL", "jdbc:postgresql://localhost:5432/postgres");
        String user = System.getProperty("DATABASE_USER_NAME", "postgres");
        String password = System.getProperty("DATABASE_PASSWORD", "");

        Flyway flyway = Flyway.configure()
                .dataSource(url, user, password)
                .locations("classpath:db/migration")
                .load();
        flyway.repair();
        System.out.println("Flyway repair completed.");
    }

    private static void loadEnv() {
        String dir = System.getProperty("user.dir").contains("precious-backend") ? "." : "precious-backend";
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .directory(dir)
                .load();
        dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
    }
}
