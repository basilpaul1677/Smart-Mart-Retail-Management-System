package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.mapper.UserMapper;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.service.AdminUserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminUserServiceImpl
        implements AdminUserService {

    private final UserRepository userRepository;

    private final UserMapper userMapper;

    /*
     * =========================================
     * VIEW ALL USERS
     * =========================================
     */

    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    /*
     * =========================================
     * VIEW USER BY ID
     * =========================================
     */

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(
            Long userId
    ) {

        User user =
                userRepository
                        .findById(userId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "User not found with id : "
                                                + userId
                                )
                        );

        return userMapper.toUserResponse(
                user
        );
    }

    /*
     * =========================================
     * ACTIVATE USER
     * =========================================
     */

    @Override
    public UserResponse activateUser(
            Long userId
    ) {

        User user =
                getUserEntity(userId);

        user.setEnabled(true);

        User updatedUser =
                userRepository.save(user);

        return userMapper.toUserResponse(
                updatedUser
        );
    }

    /*
     * =========================================
     * DEACTIVATE USER
     * =========================================
     */

    @Override
    public UserResponse deactivateUser(
            Long userId
    ) {

        User user =
                getUserEntity(userId);

        user.setEnabled(false);

        User updatedUser =
                userRepository.save(user);

        return userMapper.toUserResponse(
                updatedUser
        );
    }

    /*
     * =========================================
     * PRIVATE HELPER
     * =========================================
     */

    private User getUserEntity(
            Long userId
    ) {

        return userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "User not found with id : "
                                        + userId
                        )
                );
    }
}