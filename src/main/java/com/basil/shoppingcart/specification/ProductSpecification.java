package com.basil.shoppingcart.specification;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import com.basil.shoppingcart.model.Product;

public final class ProductSpecification {

    private ProductSpecification() {
    }

    public static Specification<Product> isActive() {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.isTrue(
                        root.get("active")
                );
    }

    public static Specification<Product> hasKeyword(
            String keyword
    ) {

        return (root, query, criteriaBuilder) -> {

            String searchKeyword =
                    "%" + keyword.toLowerCase() + "%";

            return criteriaBuilder.or(

                    criteriaBuilder.like(
                            criteriaBuilder.lower(
                                    root.get("name")
                            ),
                            searchKeyword
                    ),

                    criteriaBuilder.like(
                            criteriaBuilder.lower(
                                    root.get("description")
                            ),
                            searchKeyword
                    )
            );
        };
    }

    public static Specification<Product> hasName(
            String name
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(
                        criteriaBuilder.lower(
                                root.get("name")
                        ),
                        "%" + name.toLowerCase() + "%"
                );
    }

    public static Specification<Product> hasCategory(
            String category
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        criteriaBuilder.lower(
                                root.get("category")
                        ),
                        category.toLowerCase()
                );
    }

    public static Specification<Product> hasBrand(
            String brand
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(
                        criteriaBuilder.lower(
                                root.get("brand")
                        ),
                        brand.toLowerCase()
                );
    }

    public static Specification<Product> priceGreaterThanOrEqualTo(
            BigDecimal minPrice
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(
                        root.get("price"),
                        minPrice
                );
    }

    public static Specification<Product> priceLessThanOrEqualTo(
            BigDecimal maxPrice
    ) {

        return (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(
                        root.get("price"),
                        maxPrice
                );
    }
}