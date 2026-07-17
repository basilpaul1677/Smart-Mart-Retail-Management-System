package com.basil.shoppingcart.service;

import java.math.BigDecimal;
import java.util.List;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    ProductResponse createProduct(ProductRequest request);

    ProductResponse getProductById(Long id);

    List<ProductResponse> getAllProducts();

    Page<ProductResponse> getProducts(String name,
                                        String category,
                                        String brand,
                                        BigDecimal minPrice,
                                        BigDecimal maxPrice,
                                        Pageable pageable
                                    );

    ProductResponse updateProduct(Long id, ProductRequest request);

    void deleteProduct(Long id);

}