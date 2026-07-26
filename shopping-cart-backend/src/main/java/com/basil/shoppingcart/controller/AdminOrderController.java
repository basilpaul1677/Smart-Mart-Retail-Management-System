package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.UpdateOrderStatusRequest;
import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.service.AdminOrderService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {

    private final AdminOrderService adminOrderService;

    /*
     * =========================================
     * VIEW ALL ORDERS
     * =========================================
     */

    @GetMapping
    public ResponseEntity<List<OrderResponse>>
    getAllOrders() {

        return ResponseEntity.ok(
                adminOrderService
                        .getAllOrders()
        );
    }

    /*
     * =========================================
     * VIEW ORDER BY ID
     * =========================================
     */

    @GetMapping("/{orderId}")
    public ResponseEntity<OrderResponse>
    getOrderById(

            @PathVariable
            Long orderId
    ) {

        return ResponseEntity.ok(
                adminOrderService
                        .getOrderById(
                                orderId
                        )
        );
    }

    /*
     * =========================================
     * UPDATE ORDER STATUS
     * =========================================
     */

    @PutMapping("/{orderId}/status")
    public ResponseEntity<OrderResponse>
    updateOrderStatus(

            @PathVariable
            Long orderId,

            @Valid
            @RequestBody
            UpdateOrderStatusRequest request
    ) {

        return ResponseEntity.ok(
                adminOrderService
                        .updateOrderStatus(
                                orderId,
                                request
                        )
        );
    }
}