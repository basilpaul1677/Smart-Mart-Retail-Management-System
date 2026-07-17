package com.basil.shoppingcart.controller;

import java.util.List;
import java.math.BigDecimal;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Validated
public class ProductController {

    private final ProductService productService;

    /**
     * Create Product
     */
    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid @RequestBody ProductRequest request) {

        ProductResponse response = productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /**
     * Get All Products
     */
    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAllProducts() {

        return ResponseEntity.ok(
                productService.getAllProducts()
        );
    }

    /**
     * Get Product By Id
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                productService.getProductById(id)
        );
    }

    /**
     * Search Product By :
     */

    @GetMapping("/search")
    public ResponseEntity<Page<ProductResponse>> searchProducts(
        @RequestParam(required = false)
        String name,

        @RequestParam(required = false)
        String category,

        @RequestParam(required = false)
        String brand,

        @RequestParam(required = false)
        BigDecimal minPrice,

        @RequestParam(required = false)
        BigDecimal maxPrice,

        @RequestParam(defaultValue = "0")
        int page,

        @RequestParam(defaultValue = "10")
        int size,

        @RequestParam(defaultValue = "createdAt")
        String sortBy,

        @RequestParam(defaultValue = "desc")
        String direction ) 
        {
            Sort sort = direction.equalsIgnoreCase("asc")
                        ? Sort.by(sortBy).ascending(): Sort.by(sortBy).descending();

            Pageable pageable = PageRequest.of(page, size, sort);
        
            return ResponseEntity.ok(productService.getProducts(
                                                                name,
                                                                category,
                                                                brand,
                                                                minPrice,
                                                                maxPrice,
                                                                pageable));
        }

    /**
     * Update Product
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductRequest request) {

        return ResponseEntity.ok(
                productService.updateProduct(id, request)
        );
    }

    /**
     * Delete Product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return ResponseEntity.noContent().build();
    }

}