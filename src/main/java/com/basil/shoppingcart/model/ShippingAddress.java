package com.basil.shoppingcart.model;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@Embeddable
public class ShippingAddress {

    @Column(
            name = "shipping_full_name",
            nullable = false,
            length = 150
    )
    private String fullName;

    @Column(
            name = "shipping_email",
            nullable = false,
            length = 150
    )
    private String email;

    @Column(
            name = "shipping_phone_number",
            nullable = false,
            length = 20
    )
    private String phoneNumber;

    @Column(
            name = "shipping_address_line",
            nullable = false,
            length = 500
    )
    private String addressLine;

    @Column(
            name = "shipping_city",
            nullable = false,
            length = 100
    )
    private String city;

    @Column(
            name = "shipping_state",
            nullable = false,
            length = 100
    )
    private String state;

    @Column(
            name = "shipping_postal_code",
            nullable = false,
            length = 20
    )
    private String postalCode;

}