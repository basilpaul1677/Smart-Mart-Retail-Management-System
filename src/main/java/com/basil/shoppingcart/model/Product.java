package com.basil.shoppingcart.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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

    @Column(length = 500)
    private String imageUrl;

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