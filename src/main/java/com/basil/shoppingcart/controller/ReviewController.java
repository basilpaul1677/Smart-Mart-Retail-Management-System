package com.basil.shoppingcart.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.basil.shoppingcart.dto.request.CreateReviewRequest;
import com.basil.shoppingcart.dto.response.ReviewResponse;
import com.basil.shoppingcart.dto.response.ReviewSummaryResponse;
import com.basil.shoppingcart.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class ReviewController {

    private final ReviewService reviewService;

    /*
     * =========================================
     * GET ALL REVIEWS FOR A PRODUCT
     * =========================================
     */
    @GetMapping("/products/{productId}/reviews")
    public ResponseEntity<List<ReviewResponse>> getProductReviews(
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(
                reviewService.getProductReviews(productId)
        );
    }

    /*
     * =========================================
     * GET REVIEW SUMMARY FOR A PRODUCT
     * =========================================
     */
    @GetMapping("/products/{productId}/reviews/summary")
    public ResponseEntity<ReviewSummaryResponse> getReviewSummary(
            @PathVariable Long productId
    ) {
        return ResponseEntity.ok(
                reviewService.getReviewSummary(productId)
        );
    }

    /*
     * =========================================
     * CREATE REVIEW
     * =========================================
     */
    @PostMapping("/products/{productId}/reviews")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ReviewResponse> createReview(
            @PathVariable Long productId,
            @Valid @RequestBody CreateReviewRequest request
    ) {
        ReviewResponse response =
                reviewService.createReview(productId, request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    /*
     * =========================================
     * UPDATE OWN REVIEW
     * =========================================
     */
    @PutMapping("/reviews/{reviewId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<ReviewResponse> updateReview(
            @PathVariable Long reviewId,
            @Valid @RequestBody CreateReviewRequest request
    ) {
        return ResponseEntity.ok(
                reviewService.updateReview(reviewId, request)
        );
    }

    /*
     * =========================================
     * DELETE OWN REVIEW
     * =========================================
     */
    @DeleteMapping("/reviews/{reviewId}")
    @PreAuthorize("hasRole('CUSTOMER')")
    public ResponseEntity<Void> deleteReview(
            @PathVariable Long reviewId
    ) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.noContent().build();
    }
}