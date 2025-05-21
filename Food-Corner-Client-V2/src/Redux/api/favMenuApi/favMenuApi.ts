import { BaseQueryApi } from "@reduxjs/toolkit/query";
import { IFavoriteResponse } from "../../../interface/favMenu.interface";
import { IApiDataResponse } from "../../interface/global.interface";
import { baseApi } from "../baseApi";

const favMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addFavMenu: builder.mutation({
      query: (data) => ({
        url: "/favProduct/add-fav-Product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["favMenu"],
    }),
    getUserFavMenu: builder.query({
      query: () => ({
        url: "/favProduct/",
        method: "GET",
      }),
      providesTags: ["favMenu"],
      transformResponse: (
        res: IApiDataResponse<IFavoriteResponse> & BaseQueryApi
      ) => {
        return res.data;
      },
    }),
    removeFavMenu: builder.mutation({
      query: (arg: { id: string }) => ({
        url: `/favProduct/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["favMenu"],
    }),
  }),
});
export const {
  useAddFavMenuMutation,
  useGetUserFavMenuQuery,
  useRemoveFavMenuMutation,
} = favMenuApi;
