interface ICustomerName {
  firstName: string;
  middleName?: string; // Optional field
  lastName: string;
}

export interface ICustomer {
  _id: string;
  id: string;
  email: string;
  contactNo: number;
  address: string;
  user: string;
  photo?: string;
  name: ICustomerName;
  __v: number;
}
