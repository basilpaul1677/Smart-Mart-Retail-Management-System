import axiosInstance from "./axiosInstance";

const getDashboardStatistics = async () => {
  const response = await axiosInstance.get(
    "/admin/dashboard/statistics"
  );

  return response.data;
};

export default {
  getDashboardStatistics,
};