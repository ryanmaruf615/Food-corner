/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { toast } from "sonner";
import { userLogout } from "../feature/userSlice/userSlice";

const baseQuery = fetchBaseQuery({
  //baseUrl: "http://localhost:3000/api/v1",
  baseUrl: "https://food-corner-back-end-mern.vercel.app/api/v1",
  credentials: "include",

  prepareHeaders: (headers, api) => {
    const { token } = (api.getState() as RootState).auth;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const customBaseApiQuery: BaseQueryFn<
  string | FetchArgs,
  BaseQueryApi,
  object
> = async (args, api, extraOptions): Promise<any> => {
  const result: any = await baseQuery(args, api, extraOptions);
  if (result.error) {
    toast.error(result.error?.data?.message);
    console.log(result.error);
  }
  if (result.error?.status === 401) {
    // const res = await fetch("http://localhost:3000/api/v1/auth/refresh-token", {
    //   method: "POST",
    //   credentials: "include",
    // });
    // const data = await res.json();

    // if (data?.success && data?.data?.accessToken) {
    //   const user = (api.getState() as RootState).authData.user;
    //   api.dispatch(setUser({ user, token: data.data.accessToken }));

    //   result = await baseQuery(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
    // console.log(data);
    api.dispatch(userLogout());
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: customBaseApiQuery,
  tagTypes: [
    "favMenu",
    "menu",
    "order",
    "rating",
    "category",
    "cuisine",
    "ratingus",
    "msg",
    "profile",
    "admin",
  ],
  endpoints: () => ({}),
});
