package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    @Override
    public OrderResponse checkout() {

        return null;
    }

    @Override
    public List<OrderResponse> getMyOrders() {

        return null;
    }

    @Override
    public OrderResponse getOrder(Long orderId) {

        return null;
    }
}