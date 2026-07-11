package com.basil.shoppingcart.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {

    private String token;

    private String tokenType;

}