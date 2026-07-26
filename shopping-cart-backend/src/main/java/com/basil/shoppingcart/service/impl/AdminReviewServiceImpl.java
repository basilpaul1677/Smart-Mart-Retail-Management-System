package com.basil.shoppingcart.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.basil.shoppingcart.dto.response.ReviewResponse;
import com.basil.shoppingcart.exception.ResourceNotFoundException;
import com.basil.shoppingcart.model.Review;
import com.basil.shoppingcart.repository.ReviewRepository;
import com.basil.shoppingcart.service.AdminReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminReviewServiceImpl implements AdminReviewService {

    private final ReviewRepository reviewRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ReviewResponse> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deleteReview(Long reviewId) {
        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Review not found with id: " + reviewId));

        reviewRepository.delete(review);
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