package com.example.precious;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class PreciousApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(PreciousApplication.class, args);
	}

    /**
     * Loads variables from .env into system properties so they are available to application.properties.
     */
    private static void loadEnv() {
        String dir = System.getProperty("user.dir").contains("precious-backend") ? "." : "precious-backend";
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .directory(dir)
                .load();
        dotenv.entries().forEach(e -> System.setProperty(e.getKey(), e.getValue()));
    }
}
