package com.basil.shoppingcart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {

    private final String token;

    private final String tokenType;

}