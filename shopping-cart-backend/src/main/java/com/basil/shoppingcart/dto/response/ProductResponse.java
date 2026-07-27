package com.basil.shoppingcart.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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

    /*
     * Primary / cover image.
     * Kept for backward compatibility.
     */
    private String imageUrl;

    /*
     * Full image gallery.
     */
    private List<String> imageUrls;

    private String brand;

    private String category;

    private Boolean active;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}