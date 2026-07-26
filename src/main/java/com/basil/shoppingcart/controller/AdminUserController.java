package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.response.UserResponse;
import com.basil.shoppingcart.service.AdminUserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {

    private final AdminUserService adminUserService;

    /*
     * =========================================
     * VIEW ALL USERS
     * =========================================
     */

    @GetMapping
    public ResponseEntity<List<UserResponse>>
    getAllUsers() {

        return ResponseEntity.ok(
                adminUserService
                        .getAllUsers()
        );
    }

    /*
     * =========================================
     * VIEW USER BY ID
     * =========================================
     */

    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse>
    getUserById(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(
                adminUserService
                        .getUserById(
                                userId
                        )
        );
    }

    /*
     * =========================================
     * ACTIVATE USER
     * =========================================
     */

    @PutMapping("/{userId}/activate")
    public ResponseEntity<UserResponse>
    activateUser(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(
                adminUserService
                        .activateUser(
                                userId
                        )
        );
    }

    /*
     * =========================================
     * DEACTIVATE USER
     * =========================================
     */

    @PutMapping("/{userId}/deactivate")
    public ResponseEntity<UserResponse>
    deactivateUser(

            @PathVariable
            Long userId
    ) {

        return ResponseEntity.ok(
                adminUserService
                        .deactivateUser(
                                userId
                        )
        );
    }
}