/* eslint-disable @typescript-eslint/no-explicit-any */
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { IMenuItem } from "../../interface/menuItem.interface";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa6";
import { useAddFavMenuMutation } from "../../Redux/api/favMenuApi/favMenuApi";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { IApiResponse } from "../../Redux/interface/global.interface";
import { toast } from "sonner";

import { ICartItem } from "../../interface/cartItem.iterface";
import { addItemToCart } from "../../Redux/feature/cartSlice/cartSlice";
import { useState } from "react";
import { decodeToken } from "../../utils/decodeToken";
import { JwtPayload } from "jwt-decode";

interface FoodDetailsContentProps {
  menuDetails: IMenuItem | undefined;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}
export const FoodDetailsContent = ({
  menuDetails,
  index,
  setIndex,
}: FoodDetailsContentProps) => {
  const { token } = useAppSelector((state) => state.auth);
  const user = decodeToken(token) as JwtPayload & {
    userEmail: string;
    role: string;
  };

  const [amount, setAmount] = useState(1);

  const dispatch = useAppDispatch();
  const addToCart = (itemData: ICartItem) => {
    dispatch(addItemToCart(itemData));
  };

  const [addtoFav] = useAddFavMenuMutation();

  const addItemToFav = async (data: {
    product: string;
    customerEmail: string;
  }) => {
    const res = (await addtoFav(data)) as IApiResponse<any>;
    if (res.data?.success) {
      toast.success(res.data.message);
    }
  };

  const [isCommentOpen, setIsCommentOpen] = useState(false);
  return (
    <>
      {menuDetails ? (
        <div className="grid my-10 justify-items-center md:justify-items-stretch md:grid-cols-2 max-w-6xl mx-auto px-2">
          <div className="w-80 ">
            <div className="w-80 h-80 rounded-lg bg-orange-400">
              <img
                className="w-80 h-80 rounded-lg object-cover"
                src={menuDetails?.photo}
                alt=""
              />
            </div>
            <div className="mt-5 mb-3 flex justify-center md:justify-end">
              <button
                onClick={() => setIsCommentOpen(!isCommentOpen)}
                className="btn btn-sm bg-orange-400 border-none outline-none text-white hover:bg-orange-400"
              >
                See Reviews
              </button>
            </div>
          </div>

          {isCommentOpen ? (
            <div className="border-orange-400 border rounded-lg">
              <div className="ms-4 mt-2 font-bold text-orange-400">
                All Comments
              </div>
              <div className=" w-full text-xs md:text-sm  p-2  gap-3 max-h-[21rem] overflow-x-auto">
                {menuDetails?.productFeedback?.map((cmt) => (
                  <div
                    key={cmt?._id}
                    className=" pb-2 border-b rounded-lg px-2 "
                  >
                    <div>
                      <p className="font-bold">
                        <span>{cmt?.customer?.email}</span>
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <p>{cmt?.comment}</p>

                      <Rating
                        style={{ maxWidth: "60px" }}
                        value={cmt?.rating}
                      ></Rating>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* title section */}
              <h1 className="text-xl font-bold">{menuDetails?.title}</h1>
              {/* rating section */}
              <div className="flex gap-2 my-2">
                <Rating
                  readOnly
                  style={{ maxWidth: 100 }}
                  value={menuDetails?.rating?.averageRating}
                ></Rating>
                <span className="font-medium">{`(${menuDetails?.rating?.ratingCount} Customer Review)`}</span>
              </div>
              {/* description section */}
              <p className="font-medium">{menuDetails?.description}</p>
              {/* category section */}
              <p>
                <span className="text-green-500 text-lg font-semibold ">
                  Category:
                </span>{" "}
                <span className="text-orange-400 text-lg font-semibold ">
                  {menuDetails?.category?.category}
                </span>
              </p>
              {/* price & size section */}
              <div className="flex gap-10 my-2 items-center">
                <p className="text-orange-500 font-bold text-2xl">
                  {menuDetails?.price[index].price}{" "}
                  <span className="text-green-500">tk</span>
                </p>
                <div className="flex mt-1 gap-3">
                  {menuDetails?.price.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        checked={index === i}
                        onChange={() => {
                          setIndex(i);
                        }}
                        type="radio"
                        name="radio-5"
                        className="radio radio-sm radio-success"
                      />
                      <p>{item.size}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="mb-5 font-semibold">
                <span className="text-orange-500"> Status:</span>{" "}
                {menuDetails.inStock ? (
                  <span className="text-green-500">available</span>
                ) : (
                  <span className="text-orange-400">unavailable</span>
                )}{" "}
              </p>

              {menuDetails?.limitedStatus?.isLimited && (
                <p className="mt-2 mb-3 list-disc">
                  {" "}
                  <span className="text-orange-400 font-bold">
                    Available Quantity:
                  </span>{" "}
                  <span className="text-green-500 font-semibold">
                    {" "}
                    {menuDetails?.limitedStatus?.quantity}
                  </span>
                </p>
              )}

              {/* cart section */}
              {user?.role !== "admin" && (
                <>
                  {" "}
                  <hr />
                  <div className="my-5 flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button
                        disabled={amount == 0 || !menuDetails.inStock}
                        onClick={() => setAmount((prev) => prev - 1)}
                        className="w-10 h-7 text-white flex justify-center items-center bg-orange-400 rounded-full btn btn-sm border-none hover:bg-orange-400"
                      >
                        <FaMinus></FaMinus>
                      </button>
                      <div>{amount}</div>
                      <button
                        disabled={
                          (menuDetails.limitedStatus.isLimited &&
                            (menuDetails.limitedStatus.quantity as number) <
                              amount) ||
                          !menuDetails.inStock
                        }
                        onClick={() => setAmount((prev) => prev + 1)}
                        className="w-10 h-7 btn btn-sm text-white flex justify-center items-center hover:bg-green-600 bg-green-500 rounded-full border-none"
                      >
                        <FaPlus></FaPlus>
                      </button>
                    </div>
                    <div>
                      <button
                        disabled={
                          (menuDetails.limitedStatus.isLimited &&
                            (menuDetails.limitedStatus.quantity as number) <
                              amount) ||
                          !menuDetails.inStock
                        }
                        onClick={() =>
                          addToCart({
                            category: menuDetails.category.category,
                            id: menuDetails._id,
                            price: menuDetails.price[index].price,
                            quantity: amount,
                            size: menuDetails.price[index].size,
                            title: menuDetails.title,
                            photo: menuDetails.photo,
                          })
                        }
                        className="btn btn-sm bg-orange-400 hover:bg-orange-400 duration-200 w-40  font-bold border-none text-white h-10 rounded-lg"
                      >
                        Add Cart
                      </button>
                    </div>
                    <div>
                      {user?.userEmail && (
                        <button
                          onDoubleClick={() =>
                            addItemToFav({
                              customerEmail: user?.userEmail,
                              product: menuDetails._id,
                            })
                          }
                          className="p-2 hover:text-orange-400 rounded-full border-orange-400 flex justify-center items-center duration-200 hover:scale-90 text-lg"
                        >
                          <FaHeart></FaHeart>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
              <hr />
              {/* other info */}

              <li className="list-item mt-2 mb-3 list-disc">
                Fast and Reliable Delivery
              </li>
            </div>
          )}
        </div>
      ) : (
        <p className="mt-10 text-xl font-semibold">No Data Found</p>
      )}
    </>
  );
};
