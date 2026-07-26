package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.response.ProductResponse;

public interface InventoryService {

    List<ProductResponse> getAllInventory();

    List<ProductResponse> getLowStockProducts();

    List<ProductResponse> getOutOfStockProducts();
}