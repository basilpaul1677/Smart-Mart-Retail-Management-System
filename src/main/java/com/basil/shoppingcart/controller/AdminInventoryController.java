package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.response.ProductResponse;
import com.basil.shoppingcart.service.InventoryService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/inventory")
@RequiredArgsConstructor
public class AdminInventoryController {

    private final InventoryService inventoryService;

    /*
     * =========================================
     * VIEW ALL INVENTORY
     * =========================================
     */

    @GetMapping
    public ResponseEntity<List<ProductResponse>>
    getAllInventory() {

        return ResponseEntity.ok(
                inventoryService
                        .getAllInventory()
        );
    }

    /*
     * =========================================
     * LOW STOCK PRODUCTS
     * =========================================
     */

    @GetMapping("/low-stock")
    public ResponseEntity<List<ProductResponse>>
    getLowStockProducts() {

        return ResponseEntity.ok(
                inventoryService
                        .getLowStockProducts()
        );
    }

    /*
     * =========================================
     * OUT OF STOCK PRODUCTS
     * =========================================
     */

    @GetMapping("/out-of-stock")
    public ResponseEntity<List<ProductResponse>>
    getOutOfStockProducts() {

        return ResponseEntity.ok(
                inventoryService
                        .getOutOfStockProducts()
        );
    }
}