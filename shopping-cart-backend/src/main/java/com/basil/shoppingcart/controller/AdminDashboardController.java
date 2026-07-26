package com.basil.shoppingcart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.response.AdminDashboardResponse;
import com.basil.shoppingcart.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/dashboard")
@RequiredArgsConstructor
public class AdminDashboardController {

    private final AdminDashboardService
            adminDashboardService;

    @GetMapping("/statistics")
    public ResponseEntity<AdminDashboardResponse>
    getDashboardStatistics() {

        return ResponseEntity.ok(
                adminDashboardService
                        .getDashboardStatistics()
        );
    }
}