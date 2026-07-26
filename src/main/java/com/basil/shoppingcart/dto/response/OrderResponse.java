package com.basil.shoppingcart.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.basil.shoppingcart.enums.OrderStatus;
import com.basil.shoppingcart.enums.PaymentMethod;

import lombok.Data;

@Data
public class OrderResponse 
{
    private Long orderId;
    private OrderStatus status;
    private BigDecimal totalAmount;
    private LocalDateTime createdAt;
    private PaymentMethod paymentMethod;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String addressLine;
    private String city;
    private String state;
    private String postalCode;
    private List<OrderItemResponse> items;
}