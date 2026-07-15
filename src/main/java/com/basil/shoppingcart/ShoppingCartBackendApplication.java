package com.basil.shoppingcart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class ShoppingCartBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShoppingCartBackendApplication.class, args);
	}

}
