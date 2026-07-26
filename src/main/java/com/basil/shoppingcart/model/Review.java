package com.basil.shoppingcart.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "reviews",

    uniqueConstraints = {

        @UniqueConstraint(

            name = "uk_review_user_product",

            columnNames = {

                "user_id",

                "product_id"

            }

        )

    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {


    /*
     * =========================================
     * PRIMARY KEY
     * =========================================
     */

    @Id

    @GeneratedValue(

        strategy = GenerationType.IDENTITY

    )

    private Long id;


    /*
     * =========================================
     * RATING
     * =========================================
     *
     * Allowed values:
     *
     * 1 = Very Bad
     * 2 = Bad
     * 3 = Average
     * 4 = Good
     * 5 = Excellent
     *
     * The range will also be validated
     * in the request DTO.
     */

    @Column(

        nullable = false

    )

    private Integer rating;


    /*
     * =========================================
     * REVIEW COMMENT
     * =========================================
     */

    @Column(

        nullable = false,

        length = 1000

    )

    private String comment;


    /*
     * =========================================
     * REVIEW AUTHOR
     * =========================================
     *
     * Many reviews can belong to one user.
     *
     * User 1 ───────── * Review
     */

    @ManyToOne(

        fetch = FetchType.LAZY,

        optional = false

    )

    @JoinColumn(

        name = "user_id",

        nullable = false

    )

    private User user;


    /*
     * =========================================
     * REVIEWED PRODUCT
     * =========================================
     *
     * Many reviews can belong to one product.
     *
     * Product 1 ───────── * Review
     */

    @ManyToOne(

        fetch = FetchType.LAZY,

        optional = false

    )

    @JoinColumn(

        name = "product_id",

        nullable = false

    )

    private Product product;


    /*
     * =========================================
     * AUDIT FIELDS
     * =========================================
     */

    @Column(

        nullable = false,

        updatable = false

    )

    private LocalDateTime createdAt;


    @Column(

        nullable = false

    )

    private LocalDateTime updatedAt;


    /*
     * =========================================
     * CREATE TIMESTAMP
     * =========================================
     */

    @jakarta.persistence.PrePersist

    protected void onCreate() {

        LocalDateTime now =

            LocalDateTime.now();


        createdAt = now;


        updatedAt = now;

    }


    /*
     * =========================================
     * UPDATE TIMESTAMP
     * =========================================
     */

    @jakarta.persistence.PreUpdate

    protected void onUpdate() {

        updatedAt =

            LocalDateTime.now();

    }

}