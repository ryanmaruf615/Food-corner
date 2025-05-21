/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IApiDataResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

export interface IApiErrorResponse {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorSources: { path: string | number; message: string }[];
  };
}

export interface IApiResponse<T> {
  data?: IApiDataResponse<T>;
  error?: IApiErrorResponse;
}
