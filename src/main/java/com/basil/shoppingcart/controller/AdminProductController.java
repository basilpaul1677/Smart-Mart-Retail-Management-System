package com.basil.shoppingcart.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.service.ProductService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductController {

    private final ProductService productService;

    /*
     * =========================================
     * CREATE PRODUCT
     * =========================================
     */

    @PostMapping
    public ResponseEntity<ProductResponse> createProduct(
            @Valid
            @RequestBody
            ProductRequest request
    ) {

        ProductResponse response =
                productService.createProduct(
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /*
     * =========================================
     * VIEW ALL PRODUCTS
     * =========================================
     */

    @GetMapping
    public ResponseEntity<Page<ProductResponse>> getProducts(

            @RequestParam(
                    required = false
            )
            String name,

            @RequestParam(
                    required = false
            )
            String category,

            @RequestParam(
                    required = false
            )
            String brand,

            @RequestParam(
                    required = false
            )
            BigDecimal minPrice,

            @RequestParam(
                    required = false
            )
            BigDecimal maxPrice,

            @RequestParam(
                    required = false
            )
            Boolean inStock,

            @PageableDefault(
                    size = 20
            )
            Pageable pageable
    ) {

        Page<ProductResponse> response =
                productService.getProducts(
                        name,
                        category,
                        brand,
                        minPrice,
                        maxPrice,
                        inStock,
                        pageable
                );

        return ResponseEntity.ok(
                response
        );
    }

    /*
     * =========================================
     * VIEW PRODUCT BY ID
     * =========================================
     */

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(
            @PathVariable Long id
    ) {

        ProductResponse response =
                productService.getProductById(
                        id
                );

        return ResponseEntity.ok(
                response
        );
    }

    /*
     * =========================================
     * UPDATE PRODUCT
     * =========================================
     */

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> updateProduct(

            @PathVariable Long id,

            @Valid
            @RequestBody
            ProductRequest request
    ) {

        ProductResponse response =
                productService.updateProduct(
                        id,
                        request
                );

        return ResponseEntity.ok(
                response
        );
    }

    /*
     * =========================================
     * DELETE PRODUCT
     * =========================================
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(
                id
        );

        return ResponseEntity.noContent()
                .build();
    }
}