import apiClient from "./apiClient";

const adminOrderService = {
    getAllOrders: async () => {
        const response = await apiClient.get("/admin/orders");
        return response.data;
    },

    getOrderById: async (orderId) => {
        const response = await apiClient.get(`/admin/orders/${orderId}`);
        return response.data;
    },

    updateOrderStatus: async (orderId, status) => {
        const response = await apiClient.put(
            `/admin/orders/${orderId}/status`,
            { status }
        );
        return response.data;
    }
};

export default adminOrderService;