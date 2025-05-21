import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCustomerInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["profile"],
    }),
    updateCustomerInfo: builder.mutation({
      query: (data) => ({
        url: "/customer/update-me",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),
    //super admin api
    getAllAdmin: builder.query({
      query: () => ({
        url: "/admin/all-admin",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    blockAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/block-admin/${data.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["admin"],
    }),
    deleteAdmin: builder.mutation({
      query: (data) => ({
        url: `/admin/delete-admin/${data.id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useGetCustomerInfoQuery,
  useUpdateCustomerInfoMutation,
  useGetAllAdminQuery,
  useBlockAdminMutation,
  useDeleteAdminMutation,
} = userApi;
