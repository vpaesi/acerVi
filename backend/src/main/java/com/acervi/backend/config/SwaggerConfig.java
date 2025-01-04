package com.acervi.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;


// rodando em http://localhost:8080/swagger-ui.html

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API do AcerVi")
                        .version("1.0.0")
                        .description("Documentação da API para gerenciamento de livros"));
    }
}
