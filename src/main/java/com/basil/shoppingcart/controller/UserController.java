package com.basil.shoppingcart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.ChangePasswordRequest;
import com.basil.shoppingcart.dto.request.UpdateProfileRequest;
import com.basil.shoppingcart.dto.response.UserProfileResponse;
import com.basil.shoppingcart.service.UserService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;


    /*
     * ============================================================
     * GET MY PROFILE
     * ============================================================
     */

    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getMyProfile() {

        return ResponseEntity.ok(
                userService.getMyProfile()
        );

    }


    /*
     * ============================================================
     * UPDATE MY PROFILE
     * ============================================================
     */

    @PutMapping("/me")
    public ResponseEntity<UserProfileResponse> updateMyProfile(

            @Valid
            @RequestBody
            UpdateProfileRequest request

    ) {

        return ResponseEntity.ok(
                userService.updateMyProfile(request)
        );

    }


    /*
     * ============================================================
     * CHANGE MY PASSWORD
     * ============================================================
     */

    @PutMapping("/me/password")
    public ResponseEntity<Void> changeMyPassword(

            @Valid
            @RequestBody
            ChangePasswordRequest request

    ) {

        userService.changeMyPassword(request);

        return ResponseEntity.noContent().build();

    }

}