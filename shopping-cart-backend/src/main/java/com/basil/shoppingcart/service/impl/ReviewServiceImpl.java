package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.request.CreateReviewRequest;
import com.basil.shoppingcart.dto.response.ReviewResponse;
import com.basil.shoppingcart.dto.response.ReviewSummaryResponse;
import com.basil.shoppingcart.exception.DuplicateResourceException;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.model.Product;
import com.basil.shoppingcart.model.Review;
import com.basil.shoppingcart.model.User;
import com.basil.shoppingcart.repository.ProductRepository;
import com.basil.shoppingcart.repository.ReviewRepository;
import com.basil.shoppingcart.repository.UserRepository;
import com.basil.shoppingcart.security.UserPrincipal;
import com.basil.shoppingcart.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public ReviewResponse createReview(Long productId, CreateReviewRequest request) {

        User user = getLoggedInUser();

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Product not found with id: " + productId));

        if (reviewRepository.existsByUserIdAndProductId(user.getId(), productId)) {
            throw new DuplicateResourceException(
                    "You have already reviewed this product.");
        }

        boolean hasPurchased = reviewRepository.hasPurchasedProduct(user.getId(), productId);

        if (!hasPurchased) {
            throw new IllegalStateException(
                    "You can review this product only after purchasing and receiving it.");
        }

        Review review = Review.builder()
                .rating(request.getRating())
                .comment(request.getComment().trim())
                .user(user)
                .product(product)
                .build();

        Review savedReview = reviewRepository.save(review);

        return mapToResponse(savedReview);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getProductReviews(Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException(
                    "Product not found with id: " + productId);
        }

        return reviewRepository.findByProductIdOrderByCreatedAtDesc(productId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public ReviewSummaryResponse getReviewSummary(Long productId) {

        if (!productRepository.existsById(productId)) {
            throw new ResourceNotFoundException(
                    "Product not found with id: " + productId);
        }

        Double averageRating = reviewRepository.findAverageRatingByProductId(productId);
        long totalReviews = reviewRepository.countByProductId(productId);

        return ReviewSummaryResponse.builder()
                .averageRating(averageRating == null ? 0.0 : Math.round(averageRating * 10.0) / 10.0)
                .totalReviews(totalReviews)
                .build();
    }

    @Override
    public ReviewResponse updateReview(Long reviewId, CreateReviewRequest request) {

        User loggedInUser = getLoggedInUser();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Review not found with id: " + reviewId));

        if (!review.getUser().getId().equals(loggedInUser.getId())) {
            throw new IllegalStateException("You can update only your own review.");
        }

        review.setRating(request.getRating());
        review.setComment(request.getComment().trim());

        Review updatedReview = reviewRepository.save(review);

        return mapToResponse(updatedReview);
    }

    @Override
    public void deleteReview(Long reviewId) {

        User loggedInUser = getLoggedInUser();

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Review not found with id: " + reviewId));

        if (!review.getUser().getId().equals(loggedInUser.getId())) {
            throw new IllegalStateException("You can delete only your own review.");
        }

        reviewRepository.delete(review);
    }

    private User getLoggedInUser() {
        UserPrincipal principal = (UserPrincipal)
                SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return userRepository.findById(principal.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Logged-in user not found."));
    }

    private ReviewResponse mapToResponse(Review review) {
        String userName = (review.getUser().getFirstName() + " " + review.getUser().getLastName()).trim();

        return ReviewResponse.builder()
                .id(review.getId())
                .rating(review.getRating())
                .comment(review.getComment())
                .userId(review.getUser().getId())
                .userName(userName)
                .productId(review.getProduct().getId())
                .productName(review.getProduct().getName())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}