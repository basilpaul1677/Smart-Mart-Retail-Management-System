package com.basil.shoppingcart.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ReviewSummaryResponse {


    /*
     * =========================================
     * AVERAGE RATING
     * =========================================
     */

    private Double averageRating;


    /*
     * =========================================
     * TOTAL REVIEWS
     * =========================================
     */

    private Long totalReviews;

}