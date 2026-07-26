package com.basil.shoppingcart.dto.request;

import java.math.BigDecimal;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ProductRequest {

    @NotBlank(message = "Product name is required")
    @Size(
            max = 150,
            message = "Product name must not exceed 150 characters"
    )
    private String name;

    @Size(
            max = 1000,
            message = "Description must not exceed 1000 characters"
    )
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(
            value = "0.0",
            inclusive = false,
            message = "Price must be greater than zero"
    )
    private BigDecimal price;

    @NotNull(message = "Quantity is required")
    @Min(
            value = 0,
            message = "Quantity cannot be negative"
    )
    private Integer quantity;

    @Size(
            max = 500,
            message = "Image URL must not exceed 500 characters"
    )
    private String imageUrl;

    @Size(
            max = 100,
            message = "Brand must not exceed 100 characters"
    )
    private String brand;

    @Size(
            max = 100,
            message = "Category must not exceed 100 characters"
    )
    private String category;
}