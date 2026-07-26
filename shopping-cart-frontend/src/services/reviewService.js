import apiClient from "./apiClient";

const reviewService = {
    getProductReviews: async (productId) => {
        const response = await apiClient.get(
            `/products/${productId}/reviews`
        );

        return response.data;
    },

    getReviewSummary: async (productId) => {
        const response = await apiClient.get(
            `/products/${productId}/reviews/summary`
        );

        return response.data;
    },

    createReview: async (productId, reviewData) => {
        const response = await apiClient.post(
            `/products/${productId}/reviews`,
            reviewData
        );

        return response.data;
    },

    updateReview: async (reviewId, reviewData) => {
        const response = await apiClient.put(
            `/reviews/${reviewId}`,
            reviewData
        );

        return response.data;
    },

    deleteReview: async (reviewId) => {
        await apiClient.delete(
            `/reviews/${reviewId}`
        );
    }
};

export default reviewService;