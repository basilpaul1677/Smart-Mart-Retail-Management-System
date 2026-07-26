package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.response.UserResponse;

public interface AdminUserService {

    List<UserResponse> getAllUsers();

    UserResponse getUserById(
            Long userId
    );

    UserResponse activateUser(
            Long userId
    );

    UserResponse deactivateUser(
            Long userId
    );
}