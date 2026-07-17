package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basil.shoppingcart.dto.request.OrderStatusUpdateRequest;
import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.service.OrderService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {

        return ResponseEntity.ok(
                orderService.getAllOrders()
        );
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable Long orderId,
            @Valid @RequestBody OrderStatusUpdateRequest request) {

        return ResponseEntity.ok(
                orderService.updateOrderStatus(
                        orderId,
                        request.getStatus()
                )
        );
    }
}