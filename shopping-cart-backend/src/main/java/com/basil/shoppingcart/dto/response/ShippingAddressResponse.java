package com.basil.shoppingcart.dto.response;

import lombok.Data;

@Data
public class ShippingAddressResponse 
{
    private String fullName;
    private String email;
    private String phoneNumber;
    private String addressLine;
    private String city;
    private String state;
    private String postalCode;
}