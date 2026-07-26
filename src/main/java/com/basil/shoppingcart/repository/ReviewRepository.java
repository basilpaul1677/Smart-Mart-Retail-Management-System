package com.basil.shoppingcart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.basil.shoppingcart.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @EntityGraph(attributePaths = {"user", "product"})
    List<Review> findByProductIdOrderByCreatedAtDesc(Long productId);

    @EntityGraph(attributePaths = {"user", "product"})
    List<Review> findAllByOrderByCreatedAtDesc();

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    Optional<Review> findByUserIdAndProductId(Long userId, Long productId);

    @Query("""
        SELECT AVG(r.rating)
        FROM Review r
        WHERE r.product.id = :productId
        """)
    Double findAverageRatingByProductId(@Param("productId") Long productId);

    long countByProductId(Long productId);

    @Query("""
        SELECT COUNT(o) > 0
        FROM Order o
        JOIN o.orderItems oi
        WHERE o.user.id = :userId
        AND oi.product.id = :productId
        AND o.status = com.basil.shoppingcart.enums.OrderStatus.DELIVERED
        """)
    boolean hasPurchasedProduct(
            @Param("userId") Long userId,
            @Param("productId") Long productId
    );
}