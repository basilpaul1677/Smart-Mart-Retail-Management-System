package com.basil.shoppingcart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.basil.shoppingcart.model.PasswordResetToken;
import com.basil.shoppingcart.model.User;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    Optional<PasswordResetToken> findByUser(User user);

    void deleteByUser(User user);
}