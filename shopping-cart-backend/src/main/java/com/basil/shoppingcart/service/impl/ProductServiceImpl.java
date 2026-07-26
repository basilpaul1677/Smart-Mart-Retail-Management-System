package com.basil.shoppingcart.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.ProductRequest;
import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.mapper.ProductMapper;
import com.basil.shoppingcart.model.Product;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.service.ProductService;
import com.basil.shoppingcart.specification.ProductSpecification;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final ProductMapper productMapper;

    @Override
    public ProductResponse createProduct(ProductRequest request) {

        log.info(
                "Creating product : {}",
                request.getName()
        );

        Product product =
                productMapper.toEntity(request);

        Product savedProduct =
                productRepository.save(product);

        return productMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id : "
                                                + id
                                )
                        );

        return productMapper.toResponse(product);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {

        return productRepository
                .findByActiveTrue()
                .stream()
                .map(productMapper::toResponse)
                .toList();
    }

@Override
@Transactional(readOnly = true)
public Page<ProductResponse> getProducts(
        String name,
        String category,
        String brand,
        BigDecimal minPrice,
        BigDecimal maxPrice,
        Boolean inStock,
        Pageable pageable
) {

    Specification<Product> specification =
            ProductSpecification.isActive();

    /*
     * Search by product name or description
     */
    if (name != null && !name.isBlank()) {

        specification = specification.and(
                ProductSpecification.hasKeyword(name)
        );
    }

    /*
     * Filter by category
     */
    if (category != null && !category.isBlank()) {

        specification = specification.and(
                ProductSpecification.hasCategory(category)
        );
    }

    /*
     * Filter by brand
     */
    if (brand != null && !brand.isBlank()) {

        specification = specification.and(
                ProductSpecification.hasBrand(brand)
        );
    }

    /*
     * Minimum price filter
     */
    if (minPrice != null) {

        specification = specification.and(
                ProductSpecification
                        .priceGreaterThanOrEqualTo(minPrice)
        );
    }

    /*
     * Maximum price filter
     */
    if (maxPrice != null) {

        specification = specification.and(
                ProductSpecification
                        .priceLessThanOrEqualTo(maxPrice)
        );
    }

    /*
     * Stock availability filter
     */
    if (Boolean.TRUE.equals(inStock)) {

        specification = specification.and(
                ProductSpecification.hasStock()
        );
    }

    return productRepository
            .findAll(
                    specification,
                    pageable
            )
            .map(productMapper::toResponse);
}

    @Override
    public ProductResponse updateProduct(
            Long id,
            ProductRequest request
    ) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id : "
                                                + id
                                )
                        );

        productMapper.updateEntity(
                product,
                request
        );

        Product updated =
                productRepository.save(product);

        return productMapper.toResponse(updated);
    }

    @Override
    public void deleteProduct(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found with id : "
                                                + id
                                )
                        );

        /*
         * Soft delete.
         *
         * The product remains in the database.
         * It is only marked as inactive.
         */
        product.setActive(false);

        productRepository.save(product);

        log.info(
                "Deactivated Product : {}",
                id
        );
    }
}