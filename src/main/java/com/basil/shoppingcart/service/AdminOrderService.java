package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.request.UpdateOrderStatusRequest;
import com.basil.shoppingcart.dto.response.OrderResponse;

public interface AdminOrderService {

    List<OrderResponse> getAllOrders();

    OrderResponse getOrderById(Long orderId);

    OrderResponse updateOrderStatus(Long orderId,UpdateOrderStatusRequest request);
}