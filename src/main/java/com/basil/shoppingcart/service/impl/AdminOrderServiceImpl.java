package com.basil.shoppingcart.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.UpdateOrderStatusRequest;
import com.basil.shoppingcart.dto.response.OrderItemResponse;
import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.model.Order;
import com.basil.shoppingcart.model.OrderItem;
import com.basil.shoppingcart.repository.OrderRepository;
import com.basil.shoppingcart.service.AdminOrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminOrderServiceImpl implements AdminOrderService {

    private final OrderRepository orderRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return orderRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id : " + orderId
                        ));

        return mapToResponse(order);
    }

    @Override
    public OrderResponse updateOrderStatus(
            Long orderId,
            UpdateOrderStatusRequest request
    ) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Order not found with id : " + orderId
                        ));

        order.setStatus(request.getStatus());

        Order updatedOrder = orderRepository.save(order);

        return mapToResponse(updatedOrder);
    }

    private OrderResponse mapToResponse(Order order) {
        OrderResponse response = new OrderResponse();

        response.setOrderId(order.getId());
        response.setStatus(order.getStatus());
        response.setTotalAmount(order.getTotalAmount());
        response.setCreatedAt(order.getCreatedAt());
        response.setPaymentMethod(order.getPaymentMethod());
        response.setFullName(order.getFullName());
        response.setEmail(order.getEmail());
        response.setPhoneNumber(order.getPhoneNumber());
        response.setAddressLine(order.getAddressLine());
        response.setCity(order.getCity());
        response.setState(order.getState());
        response.setPostalCode(order.getPostalCode());

        if (order.getOrderItems() != null) {
            response.setItems(
                    order.getOrderItems()
                            .stream()
                            .map(this::mapToOrderItemResponse)
                            .toList()
            );
        }

        return response;
    }

    private OrderItemResponse mapToOrderItemResponse(OrderItem item) {
        OrderItemResponse response = new OrderItemResponse();

        response.setProductId(item.getProduct().getId());
        response.setProductName(item.getProduct().getName());
        response.setQuantity(item.getQuantity());
        response.setPrice(item.getPrice());

        BigDecimal subTotal = item.getPrice()
                .multiply(BigDecimal.valueOf(item.getQuantity()));

        response.setSubTotal(subTotal);

        return response;
    }
}