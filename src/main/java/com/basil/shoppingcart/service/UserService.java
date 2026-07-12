package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.response.UserResponse;

public interface UserService {

    UserResponse getUserById(Long id);

    UserResponse getUserByEmail(String email);

    List<UserResponse> getAllUsers();

}