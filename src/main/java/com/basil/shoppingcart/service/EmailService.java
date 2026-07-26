package com.basil.shoppingcart.service;

public interface EmailService {

    void sendPasswordResetEmail(
            String email,
            String resetLink
    );
}