package com.basil.shoppingcart.service.impl;

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
import com.basil.shoppingcart.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final UserMapper userMapper;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserResponse register(RegisterRequest request) {

        log.info("Registration request received for email: {}", request.getEmail());

        if (userRepository.existsByEmail(request.getEmail())) {

            log.warn("Registration failed. Email already exists: {}", request.getEmail());

            throw new DuplicateResourceException(
                    "Email already exists."
            );

        }

        Role customerRole = roleRepository.findByRoleName(RoleType.ROLE_CUSTOMER)
                .orElseThrow(() -> {

                    log.error("ROLE_CUSTOMER not found in database.");

                    return new ResourceNotFoundException(
                            "Customer role not found."
                    );

                });

        User user = userMapper.toUser(request);

        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        user.setRole(customerRole);

        user.setEnabled(true);

        user.setAccountNonLocked(true);

        User savedUser = userRepository.save(user);

        log.info("User registered successfully with id: {}", savedUser.getId());

        return userMapper.toUserResponse(savedUser);

    }

    @Override
    public JwtResponse login(LoginRequest request) {

        throw new UnsupportedOperationException(
                "Login will be implemented after JWT Security."
        );

    }

}