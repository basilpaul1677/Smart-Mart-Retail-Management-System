package com.basil.shoppingcart.mapper;

import org.springframework.stereotype.Component;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.model.Product;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest request) {

        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .imageUrl(request.getImageUrl())
                .brand(request.getBrand())
                .category(request.getCategory())
                .active(true)
                .build();
    }

    public ProductResponse toResponse(Product product) {

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .imageUrl(product.getImageUrl())
                .brand(product.getBrand())
                .category(product.getCategory())
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public void updateEntity(Product product, ProductRequest request) {

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImageUrl(request.getImageUrl());
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
    }

}