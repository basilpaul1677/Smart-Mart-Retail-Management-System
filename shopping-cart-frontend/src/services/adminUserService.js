import apiClient from "./apiClient";

const adminUserService = {
    getAllUsers: async () => {
        const response = await apiClient.get("/admin/users");
        return response.data;
    },

    activateUser: async (userId) => {
        const response = await apiClient.put(`/admin/users/${userId}/activate`);
        return response.data;
    },

    deactivateUser: async (userId) => {
        const response = await apiClient.put(`/admin/users/${userId}/deactivate`);
        return response.data;
    }
};

export default adminUserService;