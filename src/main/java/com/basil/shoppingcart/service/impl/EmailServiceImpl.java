package com.basil.shoppingcart.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.basil.shoppingcart.service.EmailService;

@Service
public class EmailServiceImpl implements EmailService {

    private static final Logger log =
            LoggerFactory.getLogger(EmailServiceImpl.class);

    @Override
    public void sendPasswordResetEmail(
            String email,
            String resetLink
    ) {
        log.info("Password reset requested for: {}", email);
        log.info("Reset link: {}", resetLink);
    }
}