package com.basil.shoppingcart.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class OrderStatusUpdateRequest {

    @NotBlank(message = "Status is required")
    private String status;
}