package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.service.OrderService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping("/checkout")
    public ResponseEntity<OrderResponse> checkout() {

        return ResponseEntity.ok(
                orderService.checkout()
        );
    }

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders() {

        return ResponseEntity.ok(
                orderService.getMyOrders()
        );
    }

    /**
 * Admin - Get All Orders
 */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<OrderResponse>> getAllOrders() 
    {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

/**
 * Admin - Update Order Status
 */
    @PutMapping("/admin/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long orderId,@RequestParam String status) 
    {
        return ResponseEntity.ok(orderService.updateOrderStatus(orderId, status));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse> getOrder(@PathVariable Long orderId) 
    {
        return ResponseEntity.ok(orderService.getOrder(orderId));
    }
}