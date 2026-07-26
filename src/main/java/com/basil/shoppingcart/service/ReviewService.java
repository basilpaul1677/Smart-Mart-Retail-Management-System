package com.basil.shoppingcart.service;

import java.util.List;

import com.basil.shoppingcart.dto.request.CreateReviewRequest;
import com.basil.shoppingcart.dto.response.ReviewResponse;
import com.basil.shoppingcart.dto.response.ReviewSummaryResponse;

public interface ReviewService {


    /*
     * =========================================
     * CREATE REVIEW
     * =========================================
     *
     * Business rules:
     *
     * 1. User must be authenticated
     * 2. Product must exist
     * 3. User must have purchased the product
     * 4. Order must be delivered
     * 5. User cannot review the same product twice
     */

    ReviewResponse createReview(

            Long productId,

            CreateReviewRequest request

    );


    /*
     * =========================================
     * GET PRODUCT REVIEWS
     * =========================================
     *
     * Returns all reviews for a product.
     */

    List<ReviewResponse> getProductReviews(

            Long productId

    );


    /*
     * =========================================
     * GET REVIEW SUMMARY
     * =========================================
     *
     * Example:
     *
     * Average Rating: 4.8
     * Total Reviews: 125
     */

    ReviewSummaryResponse getReviewSummary(

            Long productId

    );


    /*
     * =========================================
     * UPDATE OWN REVIEW
     * =========================================
     *
     * A user can update only their own review.
     */

    ReviewResponse updateReview(

            Long reviewId,

            CreateReviewRequest request

    );


    /*
     * =========================================
     * DELETE OWN REVIEW
     * =========================================
     *
     * A user can delete only their own review.
     */

    void deleteReview(

            Long reviewId

    );

}