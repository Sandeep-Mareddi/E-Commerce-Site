package com.dashboard.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(info = @Info(
        title = "Dashboard API Documentation",
        description = "Dashboard has the authentication APIs and the product CRUD APIs",
        summary = "The Authentication has login and sign up APIs and the product has create and get APIs",
        version = "v1.0"
),
        servers = {
        @Server(
                description = "Dev",
                url = "http://localhost:8081"
        )
        },
        security = @SecurityRequirement(
                name = "authBearer"
        )
)
@SecurityScheme(
        name="authBearer",
        in = SecuritySchemeIn.HEADER,
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        description = "Security desc",
        scheme = "bearer"
)
public class SwaggerConfig {

}
