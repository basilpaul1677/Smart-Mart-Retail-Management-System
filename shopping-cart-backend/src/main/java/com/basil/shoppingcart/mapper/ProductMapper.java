package com.basil.shoppingcart.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Component;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.model.Product;

@Component
public class ProductMapper {

    public Product toEntity(ProductRequest request) {
        List<String> normalizedImages = normalizeImageUrls(
                request.getImageUrls(),
                request.getImageUrl()
        );

        return Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .imageUrl(
                        normalizedImages.isEmpty()
                                ? null
                                : normalizedImages.get(0)
                )
                .imageUrls(normalizedImages)
                .brand(request.getBrand())
                .category(request.getCategory())
                .active(true)
                .build();
    }

    public ProductResponse toResponse(Product product) {
        List<String> gallery =
                product.getImageUrls() == null
                        ? Collections.emptyList()
                        : new ArrayList<>(product.getImageUrls());

        if (
                gallery.isEmpty() &&
                product.getImageUrl() != null &&
                !product.getImageUrl().isBlank()
        ) {
            gallery = List.of(product.getImageUrl());
        }

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .imageUrl(
                        product.getImageUrl() != null
                                ? product.getImageUrl()
                                : (gallery.isEmpty() ? null : gallery.get(0))
                )
                .imageUrls(gallery)
                .brand(product.getBrand())
                .category(product.getCategory())
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public void updateEntity(Product product, ProductRequest request) {
        List<String> normalizedImages = normalizeImageUrls(
                request.getImageUrls(),
                request.getImageUrl()
        );

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setQuantity(request.getQuantity());
        product.setImageUrls(normalizedImages);
        product.setImageUrl(
                normalizedImages.isEmpty()
                        ? null
                        : normalizedImages.get(0)
        );
        product.setBrand(request.getBrand());
        product.setCategory(request.getCategory());
    }

    private List<String> normalizeImageUrls(
            List<String> imageUrls,
            String imageUrl
    ) {
        List<String> normalized = new ArrayList<>();

        if (imageUrls != null) {
            for (String url : imageUrls) {
                if (url != null && !url.trim().isEmpty()) {
                    normalized.add(url.trim());
                }
            }
        }

        if (normalized.isEmpty() && imageUrl != null && !imageUrl.trim().isEmpty()) {
            normalized.add(imageUrl.trim());
        }

        return normalized;
    }
}