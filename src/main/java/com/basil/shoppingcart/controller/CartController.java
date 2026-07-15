package com.basil.shoppingcart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.basil.shoppingcart.dto.request.AddToCartRequest;
import com.basil.shoppingcart.dto.response.CartResponse;
import com.basil.shoppingcart.service.CartService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<CartResponse> addProductToCart(
            @Valid @RequestBody AddToCartRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(cartService.addProductToCart(
                        request.getProductId(),
                        request.getQuantity()));
    }

    @GetMapping
    public ResponseEntity<CartResponse> getMyCart() {

        return ResponseEntity.ok(
                cartService.getMyCart()
        );
    }
}