package com.basil.shoppingcart.constants;

public final class SecurityConstants {

    private SecurityConstants() {
    }

    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    public static final long JWT_EXPIRATION = 86400000L;

}