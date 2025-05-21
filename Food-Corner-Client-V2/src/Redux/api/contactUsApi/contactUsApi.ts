import { baseApi } from "../baseApi";

const contactUsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    saveMsg: builder.mutation({
      query: (data) => ({
        url: "/message/save-msg",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["msg"],
    }),
    getAllMsg: builder.query({
      query: () => ({
        url: "/message/get-all-msg",
        method: "GET",
      }),
      providesTags: ["msg"],
    }),
    replyMsg: builder.mutation({
      query: (data) => ({
        url: `/message/reply-msg/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: ["msg"],
    }),
  }),
});

export const { useSaveMsgMutation, useGetAllMsgQuery, useReplyMsgMutation } =
  contactUsApi;
