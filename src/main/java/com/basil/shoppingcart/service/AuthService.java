package com.basil.shoppingcart.service;

import com.basil.shoppingcart.dto.request.ForgotPasswordRequest;
import com.basil.shoppingcart.dto.request.LoginRequest;
import com.basil.shoppingcart.dto.request.RegisterRequest;
import com.basil.shoppingcart.dto.request.ResetPasswordRequest;
import com.basil.shoppingcart.dto.response.JwtResponse;
import com.basil.shoppingcart.dto.response.UserResponse;

public interface AuthService {

    UserResponse register(
            RegisterRequest request
    );

    JwtResponse login(
            LoginRequest request
    );

    void forgotPassword(
            ForgotPasswordRequest request
    );

    void resetPassword(
            ResetPasswordRequest request
    );
}