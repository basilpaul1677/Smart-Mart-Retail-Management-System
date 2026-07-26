package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.ChangePasswordRequest;
import com.basil.shoppingcart.dto.request.UpdateProfileRequest;
import com.basil.shoppingcart.dto.response.UserProfileResponse;
import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.security.UserPrincipal;
import com.basil.shoppingcart.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;


    /*
     * ============================================================
     * EXISTING USER METHODS
     * ============================================================
     */


    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserById(
            Long id
    ) {

        User user =
                userRepository
                        .findById(id)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "User not found with id: "
                                                        + id
                                        )
                        );

        return convertToUserResponse(user);

    }


    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByEmail(
            String email
    ) {

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "User not found with email: "
                                                        + email
                                        )
                        );

        return convertToUserResponse(user);

    }


    @Override
    @Transactional(readOnly = true)
    public List<UserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(
                        this::convertToUserResponse
                )
                .toList();

    }


    /*
     * ============================================================
     * GET LOGGED-IN USER PROFILE
     * ============================================================
     */


    @Override
    @Transactional(readOnly = true)
    public UserProfileResponse getMyProfile() {

        User user =
                getLoggedInUser();

        return convertToProfileResponse(user);

    }


    /*
     * ============================================================
     * UPDATE PROFILE
     * ============================================================
     */


    @Override
    public UserProfileResponse updateMyProfile(
            UpdateProfileRequest request
    ) {

        User user =
                getLoggedInUser();


        String email =
                request
                        .getEmail()
                        .trim();


        /*
         * Check whether another user already owns this email.
         */

        if (
                userRepository.existsByEmailAndIdNot(
                        email,
                        user.getId()
                )
        ) {

            throw new RuntimeException(
                    "Email is already registered with another account"
            );

        }


        user.setFirstName(
                request
                        .getFirstName()
                        .trim()
        );


        user.setLastName(
                request
                        .getLastName()
                        .trim()
        );


        user.setEmail(
                email
        );


        user.setPhoneNumber(
                request
                        .getPhoneNumber()
                        .trim()
        );


        User updatedUser =
                userRepository.save(user);


        return convertToProfileResponse(
                updatedUser
        );

    }


    /*
     * ============================================================
     * CHANGE PASSWORD
     * ============================================================
     */


    @Override
    public void changeMyPassword(
            ChangePasswordRequest request
    ) {

        User user =
                getLoggedInUser();


        /*
         * 1. Verify current password
         */

        boolean currentPasswordMatches =
                passwordEncoder.matches(
                        request.getCurrentPassword(),
                        user.getPassword()
                );


        if (
                !currentPasswordMatches
        ) {

            throw new RuntimeException(
                    "Current password is incorrect"
            );

        }


        /*
         * 2. Verify new password confirmation
         */

        if (
                !request
                        .getNewPassword()
                        .equals(
                                request
                                        .getConfirmPassword()
                        )
        ) {

            throw new RuntimeException(
                    "New password and confirm password do not match"
            );

        }


        /*
         * 3. Prevent using the same password again
         */

        if (
                passwordEncoder.matches(
                        request
                                .getNewPassword(),
                        user
                                .getPassword()
                )
        ) {

            throw new RuntimeException(
                    "New password must be different from current password"
            );

        }


        /*
         * 4. Encode new password
         */

        String encodedPassword =
                passwordEncoder.encode(
                        request
                                .getNewPassword()
                );


        user.setPassword(
                encodedPassword
        );


        /*
         * 5. Save updated user
         */

        userRepository.save(user);

    }


    /*
     * ============================================================
     * GET LOGGED-IN USER
     * ============================================================
     */


    private User getLoggedInUser() {

        UserPrincipal principal =
                (UserPrincipal)
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication()
                                .getPrincipal();


        return userRepository
                .findById(
                        principal.getUserId()
                )
                .orElseThrow(
                        () ->
                                new ResourceNotFoundException(
                                        "User not found"
                                )
                );

    }


    /*
     * ============================================================
     * USER RESPONSE MAPPING
     * ============================================================
     */


    private UserResponse convertToUserResponse(
            User user
    ) {

        UserResponse response =
                new UserResponse();


        response.setId(
                user.getId()
        );


        response.setFirstName(
                user.getFirstName()
        );


        response.setLastName(
                user.getLastName()
        );


        response.setEmail(
                user.getEmail()
        );


        response.setPhoneNumber(
                user.getPhoneNumber()
        );


        if (
                user.getRole() != null
                        &&
                        user.getRole().getRoleName() != null
        ) {

            response.setRole(
                    user.getRole()
                            .getRoleName()
                            .name()
            );

        }


        return response;

    }


    /*
     * ============================================================
     * PROFILE RESPONSE MAPPING
     * ============================================================
     */


    private UserProfileResponse convertToProfileResponse(
            User user
    ) {

        String role =
                null;


        if (
                user.getRole() != null
                        &&
                        user.getRole().getRoleName() != null
        ) {

            role =
                    user.getRole()
                            .getRoleName()
                            .name();

        }


        return UserProfileResponse
                .builder()
                .id(
                        user.getId()
                )
                .firstName(
                        user.getFirstName()
                )
                .lastName(
                        user.getLastName()
                )
                .email(
                        user.getEmail()
                )
                .phoneNumber(
                        user.getPhoneNumber()
                )
                .role(
                        role
                )
                .build();

    }

}