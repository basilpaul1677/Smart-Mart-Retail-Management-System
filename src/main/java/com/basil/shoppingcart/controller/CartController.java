package com.basil.shoppingcart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.AddToCartRequest;
import com.basil.shoppingcart.dto.request.UpdateCartItemRequest;
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

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(@PathVariable Long cartItemId,@Valid @RequestBody UpdateCartItemRequest request) 
    {
        return ResponseEntity.ok(cartService.updateCartItem(cartItemId,request.getQuantity()));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) 
    {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> clearCart() 
    {
        cartService.clearCart();
        return ResponseEntity.noContent().build();
    }

}