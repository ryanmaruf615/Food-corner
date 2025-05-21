import { ICustomer } from "./customer.interface";

export interface IRateUs {
  _id: string;
  rating: number;
  comment: string;
  customer: ICustomer;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
