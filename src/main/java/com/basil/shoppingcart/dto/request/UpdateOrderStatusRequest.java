package com.basil.shoppingcart.dto.request;

import com.basil.shoppingcart.enums.OrderStatus;

import jakarta.validation.constraints.NotNull;

import lombok.Data;

@Data
public class UpdateOrderStatusRequest {

    @NotNull(
            message = "Order status is required"
    )
    private OrderStatus status;
}