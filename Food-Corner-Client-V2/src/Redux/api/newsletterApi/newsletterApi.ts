import { baseApi } from "../baseApi";

const newsLetterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveNewsSubcription: builder.mutation({
      query: (data) => ({
        url: "/newsletter/save-subcription",
        method: "POST",
        body: data,
      }),
    }),
    getNewsSubcriptionInfo: builder.query({
      query: () => ({
        url: "/newsletter/getInfo",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSaveNewsSubcriptionMutation,
  useGetNewsSubcriptionInfoQuery,
} = newsLetterApi;
