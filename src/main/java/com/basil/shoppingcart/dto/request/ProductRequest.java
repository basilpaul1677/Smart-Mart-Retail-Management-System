package com.basil.shoppingcart.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    @NotBlank(message = "Product name is required.")
    private String name;

    private String description;

    @NotNull(message = "Price is required.")
    @DecimalMin(value = "0.0", inclusive = false,
            message = "Price must be greater than zero.")
    private BigDecimal price;

    @NotNull(message = "Quantity is required.")
    @PositiveOrZero(message = "Quantity cannot be negative.")
    private Integer quantity;

    private String imageUrl;

    private String brand;

    private String category;

}