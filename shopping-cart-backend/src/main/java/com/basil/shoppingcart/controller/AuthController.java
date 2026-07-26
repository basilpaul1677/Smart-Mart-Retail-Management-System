package com.basil.shoppingcart.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.ForgotPasswordRequest;
import com.basil.shoppingcart.dto.request.LoginRequest;
import com.basil.shoppingcart.dto.request.RegisterRequest;
import com.basil.shoppingcart.dto.request.ResetPasswordRequest;
import com.basil.shoppingcart.dto.response.JwtResponse;
import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid
            @RequestBody
            RegisterRequest request
    ) {

        UserResponse response =
                authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(
            @Valid
            @RequestBody
            LoginRequest request
    ) {

        JwtResponse response =
                authService.login(request);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(
            @Valid
            @RequestBody
            ForgotPasswordRequest request
    ) {

        authService.forgotPassword(request);

        return ResponseEntity.ok(
                "If the email is registered, a password reset link has been sent."
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(
            @Valid
            @RequestBody
            ResetPasswordRequest request
    ) {

        authService.resetPassword(request);

        return ResponseEntity.ok(
                "Password reset successfully."
        );
    }
}