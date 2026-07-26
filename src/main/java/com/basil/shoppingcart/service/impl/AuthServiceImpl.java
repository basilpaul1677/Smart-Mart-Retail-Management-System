package com.basil.shoppingcart.service.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.LoginRequest;
import com.basil.shoppingcart.dto.request.RegisterRequest;
import com.basil.shoppingcart.dto.response.JwtResponse;
import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.enums.RoleType;
import com.basil.shoppingcart.exception.DuplicateResourceException;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.mapper.UserMapper;
import com.basil.shoppingcart.model.Role;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.RoleRepository;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.security.JwtService;
import com.basil.shoppingcart.service.AuthService;
import com.basil.shoppingcart.service.EmailService;

import java.time.LocalDateTime;
import java.util.UUID;

import com.basil.shoppingcart.dto.request.ForgotPasswordRequest;
import com.basil.shoppingcart.dto.request.ResetPasswordRequest;
import com.basil.shoppingcart.model.PasswordResetToken;
import com.basil.shoppingcart.repository.PasswordResetTokenRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl
        implements AuthService {


    private final UserRepository userRepository;


    private final RoleRepository roleRepository;


    private final UserMapper userMapper;


    private final PasswordEncoder passwordEncoder;


    private final AuthenticationManager authenticationManager;


    private final JwtService jwtService;

    private final PasswordResetTokenRepository passwordResetTokenRepository;

    private final EmailService emailService;

    @Override
    public UserResponse register(

            RegisterRequest request

    ) {


        log.info(

                "Registration request received for email: {}",

                request.getEmail()

        );


        if (

                userRepository.existsByEmail(

                        request.getEmail()

                )

        ) {


            log.warn(

                    "Registration failed. Email already exists: {}",

                    request.getEmail()

            );


            throw new DuplicateResourceException(

                    "Email already exists."

            );

        }


        Role customerRole =

                roleRepository

                        .findByRoleName(

                                RoleType.ROLE_CUSTOMER

                        )

                        .orElseThrow(() -> {


                            log.error(

                                    "ROLE_CUSTOMER not found in database."

                            );


                            return new ResourceNotFoundException(

                                    "Customer role not found."

                            );

                        });


        User user =

                userMapper.toUser(

                        request

                );


        user.setPassword(

                passwordEncoder.encode(

                        request.getPassword()

                )

        );


        user.setRole(

                customerRole

        );


        user.setEnabled(

                true

        );


        user.setAccountNonLocked(

                true

        );


        User savedUser =

                userRepository.save(

                        user

                );


        log.info(

                "User registered successfully with id: {}",

                savedUser.getId()

        );


        return userMapper.toUserResponse(

                savedUser

        );

    }

    @Override
public void forgotPassword(
        ForgotPasswordRequest request
) {

    String email =
            request
                    .getEmail()
                    .trim()
                    .toLowerCase();

    userRepository
            .findByEmail(email)
            .ifPresent(user -> {

                passwordResetTokenRepository
                        .deleteByUser(user);

                PasswordResetToken resetToken =
                        new PasswordResetToken();

                resetToken.setToken(
                        UUID.randomUUID()
                                .toString()
                );

                resetToken.setUser(user);

                resetToken.setExpiryDate(
                        LocalDateTime.now()
                                .plusMinutes(15)
                );

                resetToken.setUsed(
                        false
                );

                passwordResetTokenRepository
                        .save(resetToken);

                String resetLink =
                        "http://localhost:5173/reset-password?token="
                                + resetToken.getToken();

                emailService
                        .sendPasswordResetEmail(
                                user.getEmail(),
                                resetLink
                        );
            });
}

        @Override
public void resetPassword(
        ResetPasswordRequest request
) {

    PasswordResetToken resetToken =
            passwordResetTokenRepository
                    .findByToken(
                            request.getToken()
                    )
                    .orElseThrow(
                            () ->
                                    new RuntimeException(
                                            "Invalid password reset token"
                                    )
                    );

    if (
            resetToken.isUsed()
    ) {

        throw new RuntimeException(
                "Password reset token has already been used"
        );
    }

    if (
            resetToken
                    .getExpiryDate()
                    .isBefore(
                            LocalDateTime.now()
                    )
    ) {

        throw new RuntimeException(
                "Password reset token has expired"
        );
    }

    User user =
            resetToken.getUser();

    user.setPassword(
            passwordEncoder.encode(
                    request.getNewPassword()
            )
    );

    userRepository.save(
            user
    );

    resetToken.setUsed(
            true
    );

    passwordResetTokenRepository.save(
            resetToken
    );
}


    @Override
    public JwtResponse login(

            LoginRequest request

    ) {


        log.info(

                "Login request received for email: {}",

                request.getEmail()

        );


        Authentication authentication =

                authenticationManager.authenticate(

                        new UsernamePasswordAuthenticationToken(

                                request.getEmail(),

                                request.getPassword()

                        )

                );


        UserDetails userDetails =

                (UserDetails)

                        authentication.getPrincipal();


        String token =

                jwtService.generateToken(

                        userDetails

                );


        String role =

                userDetails

                        .getAuthorities()

                        .stream()

                        .findFirst()

                        .map(

                                authority ->

                                        authority.getAuthority()

                        )

                        .orElse(

                                null

                        );


        log.info(

                "Login successful for email: {}",

                request.getEmail()

        );


        return new JwtResponse(

                token,

                "Bearer",

                role

        );

    }

}