package com.basil.shoppingcart.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    CommandLineRunner verifyApplication() {

        return args -> {

            System.out.println();
            System.out.println("=====================================");
            System.out.println("Shopping Cart Backend Started");
            System.out.println("=====================================");
            System.out.println();

        };

    }

}