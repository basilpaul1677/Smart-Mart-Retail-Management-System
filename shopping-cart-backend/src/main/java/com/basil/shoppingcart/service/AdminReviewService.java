package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.response.ReviewResponse;

public interface AdminReviewService {

    List<ReviewResponse> getAllReviews();

    void deleteReview(Long reviewId);
}