package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.mapper.ProductMapper;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.service.InventoryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class InventoryServiceImpl
        implements InventoryService {

    private static final int LOW_STOCK_THRESHOLD = 10;

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    /*
     * =========================================
     * ALL INVENTORY
     * =========================================
     */

    @Override
    public List<ProductResponse> getAllInventory() {

        return productRepository
                .findByActiveTrue()
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    /*
     * =========================================
     * LOW STOCK PRODUCTS
     * =========================================
     */

    @Override
    public List<ProductResponse> getLowStockProducts() {

        return productRepository
                .findByQuantityLessThanAndActiveTrue(
                        LOW_STOCK_THRESHOLD
                )
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

    /*
     * =========================================
     * OUT OF STOCK PRODUCTS
     * =========================================
     */

    @Override
    public List<ProductResponse> getOutOfStockProducts() {

        return productRepository
                .findByQuantityEqualsAndActiveTrue(
                        0
                )
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }
}