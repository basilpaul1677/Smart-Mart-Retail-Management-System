package com.basil.shoppingcart.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @org.springframework.data.annotation.Id
    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 150)
    private String name;

    @Column(length = 1000)
    private String description;

    @NotNull
    @DecimalMin("0.0")
    @Column(nullable = false)
    private BigDecimal price;

    @NotNull
    @Column(nullable = false)
    private Integer quantity;

    /*
     * Primary / cover image.
     * Kept for backward compatibility.
     */
    @Column(length = 500)
    private String imageUrl;

    /*
     * Multiple product images.
     * Stored in a separate table.
     */
    @Builder.Default
    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(
            name = "product_image_urls",
            joinColumns = @JoinColumn(name = "product_id")
    )
    @OrderColumn(name = "image_order")
    @Column(name = "image_url", length = 500)
    private List<String> imageUrls = new ArrayList<>();

    @Column(length = 100)
    private String brand;

    @Column(length = 100)
    private String category;

    @Builder.Default
    @Column(nullable = false)
    private Boolean active = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    public void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    public void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}