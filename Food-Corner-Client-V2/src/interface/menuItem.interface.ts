interface IProductFeedback {
  _id: string;
  product: string;
  rating: number;
  comment: string;
  customer: {
    _id: string;
    id: string;
    email: string;
    name: {
      firstName: string;
      lastName: string;
      middleName?: string; // optional middleName
    };
    contactNo: number;
    address: string;
    user: string;
    __v: number;
  };
  orderId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IMenuItem {
  availableFor: {
    Breakfast: boolean;
    Dinner: boolean;
    Lunch: boolean;
  };
  category: { _id: string; category: string };
  createdAt: string; // Use Date type if you prefer to work with actual Date objects
  cuisine: { _id: string; cuisine: string };
  description: string;
  isDeleted: boolean;
  photo: string;
  price: Array<{
    // Assuming price is an array of objects; specify properties if known
    size: string;
    price: number;
  }>;

  inStock: boolean;
  limitedStatus: {
    quantity: number | null;
    isLimited: boolean;
  };

  rating: { averageRating: number; ratingCount: number };
  title: string;
  updatedAt: string; // Use Date type if you prefer to work with actual Date objects
  __v: number;
  _id: string;

  productFeedback: IProductFeedback[];
}

export interface ITimeBasedMenuData {
  result: IMenuItem[];
  availableTime: {
    breakfast: boolean;
    dinner: boolean;
    lunch: boolean;
  };
}
