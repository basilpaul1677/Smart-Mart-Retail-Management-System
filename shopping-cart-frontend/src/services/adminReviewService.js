import apiClient from "./apiClient";

const adminReviewService = {
    getAllReviews: async () => {
        const response = await apiClient.get("/admin/reviews");
        return response.data;
    },

    deleteReview: async (reviewId) => {
        await apiClient.delete(`/admin/reviews/${reviewId}`);
    }
};

export default adminReviewService;