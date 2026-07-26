package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.request.ChangePasswordRequest;
import com.basil.shoppingcart.dto.request.UpdateProfileRequest;
import com.basil.shoppingcart.dto.response.UserProfileResponse;
import com.basil.shoppingcart.dto.response.UserResponse;

public interface UserService {

    UserResponse getUserById(Long id);

    UserResponse getUserByEmail(String email);

    List<UserResponse> getAllUsers();

    UserProfileResponse getMyProfile();

    UserProfileResponse updateMyProfile(UpdateProfileRequest request);

    void changeMyPassword(ChangePasswordRequest request);
}