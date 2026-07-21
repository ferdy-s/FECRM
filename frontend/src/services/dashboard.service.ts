import { api } from "./api";

export const dashboardService = {

  async getAdminDashboard() {

  const response =
    await api.get(
      "/dashboard/admin"
    );

  return response.data.data;
},

  async getManagerDashboard() {
    const response =
      await api.get(
        "/dashboard/manager"
      );

    return response.data.data;
  },

  async getFinanceDashboard() {
    const response =
      await api.get(
        "/dashboard/finance"
      );

    return response.data.data;
  },

  async getSalesDashboard() {
    const response =
      await api.get(
        "/dashboard/sales"
      );

    return response.data.data;
  },

  async getMarketingDashboard() {

  const response =
    await api.get(
      "/dashboard/marketing"
    );

  return response.data.data;
},

};