package com.basil.shoppingcart.service.impl;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.CheckoutRequest;
import com.basil.shoppingcart.dto.response.OrderItemResponse;
import com.basil.shoppingcart.dto.response.OrderResponse;
import com.basil.shoppingcart.enums.OrderStatus;
import com.basil.shoppingcart.model.Cart;
import com.basil.shoppingcart.model.CartItem;
import com.basil.shoppingcart.model.Order;
import com.basil.shoppingcart.model.OrderItem;
import com.basil.shoppingcart.model.Product;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.CartItemRepository;
import com.basil.shoppingcart.repository.CartRepository;
import com.basil.shoppingcart.repository.OrderItemRepository;
import com.basil.shoppingcart.repository.OrderRepository;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.security.UserPrincipal;
import com.basil.shoppingcart.service.OrderService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;

    private final OrderItemRepository orderItemRepository;

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final ProductRepository productRepository;

    private final UserRepository userRepository;


    @Override
    public OrderResponse checkout(

            CheckoutRequest request

    ) {

        User user = getLoggedInUser();


        Cart cart = getCart(
                user
        );


        if (

                cart.getCartItems() == null ||

                cart.getCartItems().isEmpty()

        ) {

            throw new RuntimeException(
                    "Cart is empty"
            );

        }


        Order order = new Order();


        order.setUser(
                user
        );


        order.setStatus(
                OrderStatus.PENDING
        );


        order.setPaymentMethod(
                request.getPaymentMethod()
        );


        order.setFullName(
                request.getFullName()
        );


        order.setEmail(
                request.getEmail()
        );


        order.setPhoneNumber(
                request.getPhoneNumber()
        );


        order.setAddressLine(
                request.getAddressLine()
        );


        order.setCity(
                request.getCity()
        );


        order.setState(
                request.getState()
        );


        order.setPostalCode(
                request.getPostalCode()
        );


        order.setTotalAmount(
                BigDecimal.ZERO
        );


        order = orderRepository.save(
                order
        );


        BigDecimal total =

                BigDecimal.ZERO;


        for (

                CartItem cartItem :

                cart.getCartItems()

        ) {


            Product product =

                    cartItem.getProduct();


            if (

                    !Boolean.TRUE.equals(
                            product.getActive()
                    )

            ) {

                throw new RuntimeException(

                        "Product is no longer available: "

                                + product.getName()

                );

            }


            if (

                    product.getQuantity()

                            <

                    cartItem.getQuantity()

            ) {

                throw new RuntimeException(

                        "Insufficient stock for product: "

                                + product.getName()

                );

            }


            OrderItem orderItem =

                    new OrderItem();


            orderItem.setOrder(

                    order

            );


            orderItem.setProduct(

                    product

            );


            orderItem.setQuantity(

                    cartItem.getQuantity()

            );


            orderItem.setPrice(

                    product.getPrice()

            );


            orderItemRepository.save(

                    orderItem

            );


            product.setQuantity(

                    product.getQuantity()

                            -

                    cartItem.getQuantity()

            );


            productRepository.save(

                    product

            );


            BigDecimal itemTotal =

                    product.getPrice()

                            .multiply(

                                    BigDecimal.valueOf(

                                            cartItem.getQuantity()

                                    )

                            );


            total = total.add(

                    itemTotal

            );

        }


        order.setTotalAmount(

                total

        );


        orderRepository.save(

                order

        );


        cartItemRepository.deleteAll(

                cart.getCartItems()

        );


        cart.getCartItems().clear();


        cart.setTotalAmount(

                BigDecimal.ZERO

        );


        cartRepository.save(

                cart

        );


        return convertToResponse(

                order

        );

    }


    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getMyOrders() {

        User user =

                getLoggedInUser();


        return orderRepository

                .findByUserOrderByCreatedAtDesc(

                        user

                )

                .stream()

                .map(

                        this::convertToResponse

                )

                .toList();

    }


    @Override
    @Transactional(readOnly = true)
    public OrderResponse getOrder(

            Long orderId

    ) {

        User user =

                getLoggedInUser();


        Order order =

                orderRepository

                        .findById(

                                orderId

                        )

                        .orElseThrow(

                                () ->

                                        new ResourceNotFoundException(

                                                "Order not found with id: "

                                                        + orderId

                                        )

                        );


        if (

                !order.getUser()

                        .getId()

                        .equals(

                                user.getId()

                        )

        ) {

            throw new RuntimeException(

                    "You are not authorized to view this order"

            );

        }


        return convertToResponse(

                order

        );

    }


    @Override
    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {

        return orderRepository

                .findAllByOrderByCreatedAtDesc()

                .stream()

                .map(

                        this::convertToResponse

                )

                .toList();

    }


    @Override
    public OrderResponse updateOrderStatus(

            Long orderId,

            String status

    ) {

        Order order =

                orderRepository

                        .findById(

                                orderId

                        )

                        .orElseThrow(

                                () ->

                                        new ResourceNotFoundException(

                                                "Order not found with id: "

                                                        + orderId

                                        )

                        );


        OrderStatus newStatus;


        try {

            newStatus =

                    OrderStatus.valueOf(

                            status

                                    .trim()

                                    .toUpperCase()

                    );

        }

        catch (

                IllegalArgumentException exception

        ) {

            throw new RuntimeException(

                    "Invalid order status"

            );

        }


        order.setStatus(

                newStatus

        );


        orderRepository.save(

                order

        );


        return convertToResponse(

                order

        );

    }


    private OrderResponse convertToResponse(

            Order order

    ) {

        OrderResponse response =

                new OrderResponse();


        response.setOrderId(

                order.getId()

        );


        response.setStatus(

                order.getStatus()

        );


        response.setTotalAmount(

                order.getTotalAmount()

        );


        response.setCreatedAt(

                order.getCreatedAt()

        );


        response.setPaymentMethod(

                order.getPaymentMethod()

        );


        response.setFullName(

                order.getFullName()

        );


        response.setEmail(

                order.getEmail()

        );


        response.setPhoneNumber(

                order.getPhoneNumber()

        );


        response.setAddressLine(

                order.getAddressLine()

        );


        response.setCity(

                order.getCity()

        );


        response.setState(

                order.getState()

        );


        response.setPostalCode(

                order.getPostalCode()

        );


        response.setItems(

                order.getOrderItems()

                        .stream()

                        .map(

                                item -> {

                                    OrderItemResponse dto =

                                            new OrderItemResponse();


                                    dto.setProductId(

                                            item.getProduct()

                                                    .getId()

                                    );


                                    dto.setProductName(

                                            item.getProduct()

                                                    .getName()

                                    );


                                    dto.setQuantity(

                                            item.getQuantity()

                                    );


                                    dto.setPrice(

                                            item.getPrice()

                                    );


                                    dto.setSubTotal(

                                            item.getPrice()

                                                    .multiply(

                                                            BigDecimal.valueOf(

                                                                    item.getQuantity()

                                                            )

                                                    )

                                    );


                                    return dto;

                                }

                        )

                        .toList()

        );
        return response;
    }

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
                                new RuntimeException(
                                        "User not found"
                                )
                );
    }

    private Cart getCart(
            User user
    ) {
        return cartRepository
                .findByUser(
                        user
                )
                .orElseThrow(
                        () ->
                                new RuntimeException(
                                        "Cart not found"
                                )
                );
    }
}
