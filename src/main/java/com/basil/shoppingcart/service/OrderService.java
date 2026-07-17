package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.response.OrderResponse;

public interface OrderService {

    OrderResponse checkout();

    List<OrderResponse> getMyOrders();

    OrderResponse getOrder(Long orderId);

    List<OrderResponse> getAllOrders();
    OrderResponse updateOrderStatus(Long orderId,String status);
}