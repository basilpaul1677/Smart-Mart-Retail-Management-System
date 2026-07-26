package com.basil.shoppingcart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.basil.shoppingcart.model.OrderItem;

public interface OrderItemRepository
        extends JpaRepository<OrderItem, Long> {

}