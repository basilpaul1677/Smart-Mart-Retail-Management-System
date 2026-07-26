package com.basil.shoppingcart.service.impl;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.AdminDashboardResponse;
import com.basil.shoppingcart.repository.OrderRepository;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.service.AdminDashboardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AdminDashboardServiceImpl
        implements AdminDashboardService {

    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final OrderRepository orderRepository;

    @Override
    public AdminDashboardResponse
    getDashboardStatistics() {

        long totalUsers =
                userRepository.count();

        long totalProducts =
                productRepository.countByActiveTrue();

        long totalOrders =
                orderRepository.count();

        BigDecimal totalRevenue =
                orderRepository.calculateTotalRevenue();

        long lowStockProducts =
                productRepository
                        .countByQuantityLessThanAndActiveTrue(
                                10
                        );

        long outOfStockProducts =
                productRepository
                        .countByQuantityEqualsAndActiveTrue(
                                0
                        );

        return AdminDashboardResponse
                .builder()
                .totalUsers(totalUsers)
                .totalProducts(totalProducts)
                .totalOrders(totalOrders)
                .totalRevenue(
                        totalRevenue != null
                                ? totalRevenue
                                : BigDecimal.ZERO
                )
                .lowStockProducts(
                        lowStockProducts
                )
                .outOfStockProducts(
                        outOfStockProducts
                )
                .build();
    }
}