package com.basil.shoppingcart.service;

import com.basil.shoppingcart.dto.response.CartResponse;

public interface CartService {

    CartResponse addProductToCart(Long productId, Integer quantity);

    CartResponse getMyCart();

    CartResponse updateCartItem(Long cartItemId, Integer quantity);

    void removeCartItem(Long cartItemId);

    void clearCart();

}