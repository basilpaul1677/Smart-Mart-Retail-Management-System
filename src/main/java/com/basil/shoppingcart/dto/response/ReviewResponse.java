package com.basil.shoppingcart.dto.response;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewResponse {

    private Long id;
    private Integer rating;
    private String comment;

    private Long userId;
    private String userName;

    private Long productId;
    private String productName;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}