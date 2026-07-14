package com.basil.shoppingcart.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ProductResponse {

    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private Integer quantity;

    private String imageUrl;

    private String brand;

    private String category;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}