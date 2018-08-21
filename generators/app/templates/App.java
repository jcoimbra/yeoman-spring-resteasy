package <%= basePkg %>;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class <%= appClass %>Application {

    public static void main(String[] args) {
        SpringApplication.run(<%= appClass %>Application.class, args);
    }
}
