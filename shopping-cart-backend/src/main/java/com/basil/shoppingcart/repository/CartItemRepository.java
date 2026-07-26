package com.basil.shoppingcart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.basil.shoppingcart.model.Cart;
import com.basil.shoppingcart.model.CartItem;
import com.basil.shoppingcart.model.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    Optional<CartItem> findByCartAndProduct(Cart cart, Product product);

}