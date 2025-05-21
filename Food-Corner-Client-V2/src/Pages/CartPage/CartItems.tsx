/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CartCard from "./CartCard";
import SectionHeader from "../../components/common/SectionHeader/SectionHeader";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { ICartItem } from "../../interface/cartItem.iterface";
import { useCreateOrderMutation } from "../../Redux/api/orderApi/orderApi";

import { IApiResponse } from "../../Redux/interface/global.interface";
import { toast } from "sonner";
import ReactHelemt from "../../components/common/ReactHelmet/ReactHelemt";
import { Effect } from "../../components/FramerMotion/Effect";
import { useGetNewsSubcriptionInfoQuery } from "../../Redux/api/newsletterApi/newsletterApi";
import { useEffect } from "react";
import {
  resetDiscount,
  setDiscount,
} from "../../Redux/feature/cartSlice/cartSlice";

const CartItems = () => {
  const dispatch = useAppDispatch();
  const { cartItems, totalPrice, discount, subTotal, additionalDiscount } =
    useAppSelector((state) => state.cart);

  const { data, refetch } = useGetNewsSubcriptionInfoQuery("");
  console.log(data);
  const [makePayment] = useCreateOrderMutation();
  const createPayment = async (data: any) => {
    if (data) {
      const res = (await makePayment(data)) as IApiResponse<any>;
      if (res.data?.success) {
        toast.success(res.data.message);

        window.location.href = res.data?.data?.payLink;
      }
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(resetDiscount());
    if (data?.data && data?.data?.isDiscountApplied == false) {
      dispatch(setDiscount());
    }
    refetch();
  }, [data?.data, cartItems]);

  return (
    <div>
      <ReactHelemt title=": Cart"></ReactHelemt>
      <SectionHeader text="Your Cart"></SectionHeader>
      <Effect>
        {" "}
        <div className="p-2  container  mx-auto gap-10 grid md:grid-cols-3 justify-items-center md:justify-items-stretch ">
          <div className="md:col-span-2 rounded-md p-2 my-5  shadow-inner overflow-y-auto w-full max-h-[60vh] custom-scrollbar">
            <div className="  flex flex-col gap-3 ">
              {cartItems.length == 0 && (
                <p className="text-center text-orange-400 text-xl font-bold mt-3">
                  You have no item in cart
                </p>
              )}
              {cartItems?.map((itemData, i) => (
                <CartCard key={i} itemData={itemData}></CartCard>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h1 className="text-xl text-center font-bold text-orange-400">
              Cart Total
            </h1>
            <hr className="my-2" />
            <div className="flex justify-between">
              <h2>Total:</h2>
              <p>
                {totalPrice} <span>tk</span>
              </p>
            </div>
            <div className="flex justify-between">
              <h2>Discount:</h2>
              <p>
                {discount} <span>tk</span>
              </p>
            </div>
            <div className="flex justify-between">
              <h2>Additional Discount:</h2>
              <p>
                {additionalDiscount} <span>tk</span>
              </p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between">
              <h2>Subtotal:</h2>
              <p>
                {subTotal} <span>tk</span>
              </p>{" "}
            </div>
            <button
              onClick={() =>
                createPayment({
                  total: { totalPrice, discount, subTotal },
                  items: cartItems.map((item: ICartItem) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    size: item.size,
                  })),
                })
              }
              disabled={cartItems?.length == 0}
              className=" mt-2 w-full btn btn-sm bg-orange-400 hover:bg-orange-400  border-none text-white duration-200"
            >
              Proseed to Pay
            </button>
            <li className="list mt-4 text-green-500 font-semibold list-disc">
              Get 5% discount over 600tk
            </li>
          </div>
        </div>
      </Effect>
    </div>
  );
};

export default CartItems;
