package com.basil.shoppingcart.model;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.basil.shoppingcart.enums.OrderStatus;
import com.basil.shoppingcart.enums.PaymentMethod;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "orders")
@EqualsAndHashCode(callSuper = true)
public class Order extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    private User user;


    @Column(
            nullable = false,
            precision = 12,
            scale = 2
    )
    private BigDecimal totalAmount;


    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 30
    )
    private OrderStatus status;


    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false,
            length = 20
    )
    private PaymentMethod paymentMethod;


    @Column(
            nullable = false,
            length = 150
    )
    private String fullName;


    @Column(
            nullable = false,
            length = 150
    )
    private String email;


    @Column(
            nullable = false,
            length = 20
    )
    private String phoneNumber;


    @Column(
            nullable = false,
            length = 500
    )
    private String addressLine;


    @Column(
            nullable = false,
            length = 100
    )
    private String city;


    @Column(
            nullable = false,
            length = 100
    )
    private String state;


    @Column(
            nullable = false,
            length = 10
    )
    private String postalCode;


    @OneToMany(
            mappedBy = "order",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<OrderItem> orderItems = new ArrayList<>();

}