package com.basil.shoppingcart.repository;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.basil.shoppingcart.enums.OrderStatus;
import com.basil.shoppingcart.model.Order;
import com.basil.shoppingcart.model.User;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    /*
     * =========================================
     * USER ORDERS
     * =========================================
     */

    List<Order> findByUserOrderByCreatedAtDesc(
            User user
    );

    List<Order> findByUserIdOrderByCreatedAtDesc(
            Long userId
    );


    /*
     * =========================================
     * ADMIN ORDERS
     * =========================================
     */

    List<Order> findAllByOrderByCreatedAtDesc();

    List<Order> findByStatusOrderByCreatedAtDesc(
            OrderStatus status
    );

    long countByStatus(
            OrderStatus status
    );


    /*
     * =========================================
     * DASHBOARD STATISTICS
     * =========================================
     */

    @Query("""
            SELECT COALESCE(
                SUM(o.totalAmount),
                0
            )
            FROM Order o
            WHERE o.status = :status
            """)
    BigDecimal calculateRevenueByStatus(
            @Param("status")
            OrderStatus status
    );


    /*
     * Total revenue excluding cancelled orders
     */
    @Query("""
            SELECT COALESCE(
                SUM(o.totalAmount),
                0
            )
            FROM Order o
            WHERE o.status <> 
                  com.basil.shoppingcart.enums.OrderStatus.CANCELLED
            """)
    BigDecimal calculateTotalRevenue();


    List<Order> findTop10ByOrderByCreatedAtDesc();


    /*
     * =========================================
     * USER ORDER STATISTICS
     * =========================================
     */

    long countByUser(
            User user
    );

    long countByUserId(
            Long userId
    );

}