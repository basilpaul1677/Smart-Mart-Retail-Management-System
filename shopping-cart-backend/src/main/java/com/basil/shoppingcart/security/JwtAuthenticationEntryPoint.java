package com.basil.shoppingcart.security;

import java.io.IOException;
import java.time.LocalDateTime;

import org.springframework.http.MediaType;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(
            HttpServletRequest request,
            HttpServletResponse response,
            AuthenticationException authException)
            throws IOException, ServletException {

        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);

        ErrorResponse error = new ErrorResponse(
                LocalDateTime.now(),
                HttpServletResponse.SC_UNAUTHORIZED,
                "Unauthorized",
                "Authentication is required to access this resource.",
                request.getRequestURI()
        );

        new ObjectMapper().writeValue(response.getOutputStream(), error);
    }

    private record ErrorResponse(
            LocalDateTime timestamp,
            int status,
            String error,
            String message,
            String path
    ) {
    }
}