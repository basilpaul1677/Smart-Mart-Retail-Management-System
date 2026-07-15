package com.basil.shoppingcart.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.basil.shoppingcart.enums.OrderStatus;

import lombok.Data;

@Data
public class OrderResponse {

    private Long orderId;

    private OrderStatus status;

    private BigDecimal totalAmount;

    private LocalDateTime createdAt;

    private List<OrderItemResponse> items;
}