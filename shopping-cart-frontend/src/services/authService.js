import axiosInstance from "../api/axiosInstance";

const register = async (userData) => {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
};

const login = async (credentials) => {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
};

const forgotPassword = async (email) => {
    const response = await axiosInstance.post("/auth/forgot-password", { email });
    return response.data;
};

const resetPassword = async (payload) => {
    const response = await axiosInstance.post("/auth/reset-password", payload);
    return response.data;
};

const authService = {
    register,
    login,
    forgotPassword,
    resetPassword
};

export default authService;