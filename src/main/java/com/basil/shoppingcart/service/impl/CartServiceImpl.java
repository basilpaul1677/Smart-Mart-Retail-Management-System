package com.basil.shoppingcart.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.CartItemResponse;
import com.basil.shoppingcart.dto.response.CartResponse;
import com.basil.shoppingcart.model.Cart;
import com.basil.shoppingcart.model.CartItem;
import com.basil.shoppingcart.model.Product;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.CartItemRepository;
import com.basil.shoppingcart.repository.CartRepository;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.security.SecurityUtils;
import com.basil.shoppingcart.security.UserPrincipal;
import com.basil.shoppingcart.service.CartService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    @Override
    public CartResponse addProductToCart(Long productId, Integer quantity) {

    User user = getLoggedInUser();

    Cart cart = getOrCreateCart(user);

    Product product = productRepository.findById(productId)

            .orElseThrow(() ->
                    new RuntimeException("Product not found"));

    CartItem cartItem = cartItemRepository

            .findByCartAndProduct(cart, product)

            .orElse(null);

    if (cartItem != null) {

        cartItem.setQuantity(
                cartItem.getQuantity() + quantity
        );

    }
    else
    {
        cartItem = new CartItem();

        cartItem.setCart(cart);

        cartItem.setProduct(product);

        cartItem.setQuantity(quantity);

        cartItem.setPrice(product.getPrice());

        cart.getCartItems().add(cartItem);
    }

        calculateCartTotal(cart);

        cartRepository.save(cart);

        return convertToResponse(cart);
    }

    @Override
    @Transactional(readOnly = true)
    public CartResponse getMyCart() {

        User user = getLoggedInUser();
        /*
         * If the user does not have a cart yet,
         * create an empty cart.
         */

        Cart cart =
                cartRepository
                        .findByUser(user)
                        .orElseGet(
                                () -> {
                                    Cart newCart = new Cart();
                                    newCart.setUser(user);
                                    newCart.setTotalAmount(
                                            BigDecimal.ZERO
                                    );
                                    return cartRepository.save(
                                            newCart
                                    );
                                }
                        );
        /*
         * Return the cart.
         *
         * If there are no items,
         * items will be an empty list.
         */

        return convertToResponse(cart);

    }

@Override
@Transactional
public CartResponse updateCartItem(
        Long cartItemId,
        Integer quantity) {

    User user = getLoggedInUser();

    Cart cart = getOrCreateCart(user);

    CartItem cartItem = cartItemRepository
            .findById(cartItemId)
            .orElseThrow(() ->
                    new RuntimeException("Cart item not found"));

    if (!cartItem.getCart().getId().equals(cart.getId())) {
        throw new RuntimeException("Cart item does not belong to your cart");
    }

        cartItem.setQuantity(quantity);
        cartItemRepository.save(cartItem);
        calculateCartTotal(cart);
        cartRepository.save(cart);
        return convertToResponse(cart);
}

@Override
@Transactional
public void removeCartItem(Long cartItemId) {

    User user = getLoggedInUser();

    Cart cart = getOrCreateCart(user);

    CartItem cartItem = cartItemRepository
            .findById(cartItemId)
            .orElseThrow(() ->
                    new RuntimeException("Cart item not found"));

    // Security Check
    if (!cartItem.getCart().getId().equals(cart.getId())) {
        throw new RuntimeException("Cart item does not belong to your cart");
    }

    cart.getCartItems().remove(cartItem);

    cartItemRepository.delete(cartItem);

    calculateCartTotal(cart);

    cartRepository.save(cart);
}


@Override
@Transactional
public void clearCart() {

    User user = getLoggedInUser();

    Cart cart = getOrCreateCart(user);

    // Delete all cart items
    cartItemRepository.deleteAll(cart.getCartItems());

    // Clear the in-memory collection
    cart.getCartItems().clear();

    // Reset total
    cart.setTotalAmount(BigDecimal.ZERO);

    cartRepository.save(cart);
}

    /**
     * Get Logged-in User
     */
    private User getLoggedInUser() {

        UserPrincipal principal = SecurityUtils.getCurrentUser();

        return userRepository.findById(principal.getUserId())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
    }

    /**
     * Get Existing Cart or Create New Cart
     */
    private Cart getOrCreateCart(User user) {

        return cartRepository.findByUser(user)
                .orElseGet(() -> {

                    Cart cart = new Cart();

                    cart.setUser(user);

                    return cartRepository.save(cart);

                });
    }

    /**
     * Calculate Cart Total
     */
    private void calculateCartTotal(Cart cart) {

        BigDecimal total = cart.getCartItems()

                .stream()

                .map(item ->
                        item.getPrice()
                                .multiply(BigDecimal.valueOf(item.getQuantity()))
                )

                .reduce(BigDecimal.ZERO, BigDecimal::add);

        cart.setTotalAmount(total);
    }

    /**
     * Convert Cart Entity to Response DTO
     */
private CartResponse convertToResponse(Cart cart) {

    List<CartItemResponse> items = cart.getCartItems()

            .stream()

            .map(item ->

                    CartItemResponse.builder()

                            .cartItemId(
                                    item.getId()
                            )

                            .productId(
                                    item.getProduct().getId()
                            )

                            .name(
                                    item.getProduct().getName()
                            )

                            .imageUrl(
                                    item.getProduct().getImageUrl()
                            )

                            .quantity(
                                    item.getQuantity()
                            )

                            .price(
                                    item.getPrice()
                            )

                            .subtotal(

                                    item.getPrice()

                                            .multiply(

                                                    BigDecimal.valueOf(

                                                            item.getQuantity()

                                                    )

                                            )

                            )

                            .build()

            )

            .toList();


    return CartResponse.builder()

            .cartId(

                    cart.getId()

            )

            .items(

                    items

            )

            .totalAmount(

                    cart.getTotalAmount()

            )

            .build();

}

}