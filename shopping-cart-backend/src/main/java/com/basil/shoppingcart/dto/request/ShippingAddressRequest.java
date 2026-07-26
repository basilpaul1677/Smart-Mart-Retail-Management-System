package com.basil.shoppingcart.dto.request;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import lombok.Data;


@Data
public class ShippingAddressRequest {

    @NotBlank(
            message = "Full name is required"
    )
    private String fullName;

    @NotBlank(
            message = "Email is required"
    )
    @Email(
            message = "Please provide a valid email"
    )
    private String email;

    @NotBlank(
            message = "Phone number is required"
    )
    private String phoneNumber;

    @NotBlank(
            message = "Address is required"
    )
    private String addressLine;

    @NotBlank(
            message = "City is required"
    )
    private String city;

    @NotBlank(
            message = "State is required"
    )
    private String state;

    @NotBlank(
            message = "Postal code is required"
    )
    private String postalCode;

}