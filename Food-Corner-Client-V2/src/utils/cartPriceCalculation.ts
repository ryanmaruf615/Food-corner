import { ICartItem } from "../interface/cartItem.iterface";

export const cartItemCalculation = (
  cartItems: ICartItem[],
  additionalDiscount: number = 0 // default to 0 if not provided
) => {
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  // Calculate initial discount if totalPrice >= 600
  const discount = totalPrice >= 600 ? totalPrice * 0.05 : 0;

  // Apply additional discount on the total price after the initial discount
  const discountedPrice = totalPrice - discount;
  const additionalDiscountAmount = discountedPrice * (additionalDiscount / 100);

  const subTotal = discountedPrice - additionalDiscountAmount;
  console.log(subTotal);

  return {
    totalPrice,
    discount,
    additionalDiscount: additionalDiscountAmount,
    subTotal,
  };
};
