// Interface for the user's name
interface IName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

// Interface for the availableFor property in a product
interface IAvailableFor {
  Breakfast: boolean;
  Lunch: boolean;
  Dinner: boolean;
}

// Interface for the product price
interface IPrice {
  size: string;
  price: number;
}

// Interface for the product status
interface IStatus {
  availableQuantity: number;
  inStock: boolean;
}

// Interface for a single product
export interface IProduct {
  _id: string;
  title: string;
  description: string;
  photo: string;
  category: string;
  cuisine: string;
  price: IPrice[];
  availableFor: IAvailableFor;
  status: IStatus;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  __v: number;
}

// Interface for the user's information
interface ICustomer {
  _id: string;
  user: string;
  customerId: string;
  name: IName;
  address: string;
  contactNo: number;
  email: string;
  id: string;
  __v: number;
}

// Interface for the overall response data
export interface IFavoriteResponse {
  customer: ICustomer;
  products: IProduct[];
}
