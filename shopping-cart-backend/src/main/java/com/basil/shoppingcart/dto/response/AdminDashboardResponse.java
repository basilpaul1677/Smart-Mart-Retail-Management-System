package com.basil.shoppingcart.dto.response;

import java.math.BigDecimal;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminDashboardResponse 
{
    private long totalUsers;
    private long totalProducts;
    private long totalOrders;
    private BigDecimal totalRevenue;
    private long lowStockProducts;
    private long outOfStockProducts;
}