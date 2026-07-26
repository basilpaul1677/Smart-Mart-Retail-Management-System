package com.basil.shoppingcart.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.basil.shoppingcart.model.Product;

@Repository
public interface ProductRepository
        extends JpaRepository<Product, Long>,
                JpaSpecificationExecutor<Product> {

    List<Product> findByActiveTrue();

    Page<Product> findByActiveTrue(
            Pageable pageable
    );

    long countByActiveTrue();

    long countByQuantityLessThanAndActiveTrue(
            Integer quantity
    );

    long countByQuantityEqualsAndActiveTrue(
            Integer quantity
    );

    List<Product> findByQuantityLessThanAndActiveTrue(
            Integer quantity
    );

    List<Product> findByQuantityEqualsAndActiveTrue(
            Integer quantity
    );
}