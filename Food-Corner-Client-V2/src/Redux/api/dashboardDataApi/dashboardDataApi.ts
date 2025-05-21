import { baseApi } from "../baseApi";

const dashboardDataApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    adminDashboardInfo: builder.query({
      query: () => ({
        url: "/dashboard/admin-dashboard-info",
        method: "GET",
      }),
    }),
    userDashboardInfo: builder.query({
      query: () => ({
        url: "/dashboard/user-dashboard-info",
        method: "GET",
      }),
    }),
  }),
});
export const { useAdminDashboardInfoQuery, useUserDashboardInfoQuery } =
  dashboardDataApi;
