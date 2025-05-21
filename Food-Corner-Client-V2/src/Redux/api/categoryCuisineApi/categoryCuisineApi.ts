import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { IApiDataResponse } from "../../interface/global.interface";
import { baseApi } from "../baseApi";

const favMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/option/add-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["category"],
    }),
    addCuisine: builder.mutation({
      query: (data) => ({
        url: "/option/add-cuisine",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cuisine"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `/option/category/${data.id}`,
        method: "PATCH",
        body: { category: data.data },
      }),
      invalidatesTags: ["category"],
    }),
    updateCuisine: builder.mutation({
      query: (data) => ({
        url: `/option/cuisine/${data.id}`,
        method: "PATCH",
        body: { cuisine: data.data },
        invalidatesTags: ["cuisine"],
      }),
    }),
    getAllCategory: builder.query({
      query: () => ({
        url: "/option/category",
        method: "GET",
      }),
      transformResponse: (
        res: IApiDataResponse<{ _id: string; category: string }[]> &
          BaseQueryApi
      ) => {
        return res.data;
      },
      providesTags: ["category"],
    }),
    getAllCuisine: builder.query({
      query: () => ({
        url: "/option/cuisine",
        method: "GET",
      }),
      transformResponse: (
        res: IApiDataResponse<{ _id: string; cuisine: string }[]> & BaseQueryApi
      ) => {
        return res.data;
      },
      providesTags: ["cuisine"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useAddCuisineMutation,
  useGetAllCategoryQuery,
  useGetAllCuisineQuery,
  useUpdateCategoryMutation,
  useUpdateCuisineMutation,
} = favMenuApi;
