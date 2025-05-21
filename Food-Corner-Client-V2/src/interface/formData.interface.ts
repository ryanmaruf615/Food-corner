export interface IAddItemForm {
  title: string;
  description: string;
  category: string;
  price: { size: string; price: string }[];
  inStock?: boolean;
  limitedStatus: {
    isLimited?: boolean;
    quantity: string;
  };

  availableFor: {
    Breakfast?: boolean;
    Dinner?: boolean;
    Lunch?: boolean;
  };
  cuisine: string;
  photo: FileList;
}
