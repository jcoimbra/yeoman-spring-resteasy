package <%= basePkg %>;

import org.springframework.stereotype.Component;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@Component
@ApplicationPath("/<%= basePath %>")
public class JaxrsApplication extends Application {
}
