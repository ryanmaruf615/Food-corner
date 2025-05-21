import { baseApi } from "../baseApi";

const favMenuApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addRating: builder.mutation({
      query: (data) => ({
        url: "/user-rating/add-rating",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["rating"],
    }),
    addRatingUs: builder.mutation({
      query: (data) => ({
        url: "/user-rating/add-rating-us",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ratingus"],
    }),

    getRatingUs: builder.query({
      query: () => ({
        url: "/user-rating/rating-us",
        method: "GET",
      }),
      providesTags: ["ratingus"],
    }),
  }),
});

export const {
  useAddRatingMutation,
  useAddRatingUsMutation,
  useGetRatingUsQuery,
} = favMenuApi;
