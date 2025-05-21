export interface IErrorSource {
  path: string | number;
  message: string;
}

export interface IErrorData {
  statusCode: number;
  message: string;
  errorSources: IErrorSource[];
}
