package com.basil.shoppingcart.dto.request;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class ProductSearchRequest 
{
    private String keyword;
    private String category;
    private String brand;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;
    private int page = 0;
    private int size = 10;
    private String sortBy = "createdAt";
    private String sortDirection = "desc";
}