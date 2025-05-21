/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaCartPlus, FaTrash } from "react-icons/fa";
import { IProduct } from "../../interface/favMenu.interface";
import { useAppDispatch } from "../../Redux/hooks";
import { addItemToCart } from "../../Redux/feature/cartSlice/cartSlice";
import { ICartItem } from "../../interface/cartItem.iterface";
import { useRemoveFavMenuMutation } from "../../Redux/api/favMenuApi/favMenuApi";
import { IApiResponse } from "../../Redux/interface/global.interface";
import { toast } from "sonner";
import { useState } from "react";

const FavCard = ({ itemData }: { itemData: IProduct }) => {
  const dispatch = useAppDispatch();
  const [pId, setPId] = useState("");
  const [removeFavItem] = useRemoveFavMenuMutation();
  const removeItemFromFav = async (pid: string) => {
    const res = (await removeFavItem({ id: pid })) as IApiResponse<any>;
    if (res?.data?.success) {
      toast.success(res?.data?.message);
    }
  };
  const addToCart = (itemData: ICartItem) => {
    dispatch(addItemToCart(itemData));
  };
  return (
    <div className="border border-orange-400 rounded-lg flex p-3 gap-5 flex-wrap justify-between items-center relative ">
      <div className=" flex gap-2 items-center ">
        <div className="w-20 h-20 rounded-lg bg-orange-400">
          <img
            className="w-20 object-cover h-20 rounded-md"
            src={itemData?.photo}
            alt=""
          />
        </div>
        <div>
          <div className="font-bold text-nowrap text-orange-400">
            {itemData.title}
          </div>
          <div className="font-bold text-orange-400 ">
            <span className=" text-green-500">Category:</span>{" "}
            {itemData.category}
          </div>
        </div>
      </div>
      <div className="  ">
        <div className="font-semibold">
          <span className="text-green-500">Size: </span>{" "}
          {itemData.price[0].size.includes(":")
            ? itemData.price[0].size
            : `${itemData.price[0].size} inch`}
        </div>
        <div className="font-semibold">
          <span className="text-green-500">Price: </span>{" "}
          {itemData.price[0].price}
        </div>
      </div>

      <div className="ms-auto flex items-center   gap-5 md:ms-0">
        <button
          onClick={() =>
            addToCart({
              category: itemData.category,
              id: itemData._id,
              price: itemData.price[0].price,
              quantity: 1,
              size: itemData.price[0].size,
              title: itemData.title,
              photo: itemData.photo,
            })
          }
          className="btn border-none hover:bg-orange-400 text-white bg-orange-400 w-20 btn-sm"
        >
          <FaCartPlus></FaCartPlus>
        </button>
        <button
          onClick={() => {
            const modal = document.getElementById(
              "my_modal_3"
            ) as HTMLDialogElement | null;
            if (modal) {
              modal.showModal(); // Show the modal
            }
            setPId(itemData._id); // Remove the item from favorites
          }}
          className=" w-7  ms-auto h-7 flex justify-center text-sm items-center  text-orange-400 bg-white hover:bg-orange-400 hover:text-white duration-200 top-[-10px]  border border-red-500 p-1 rounded-full"
        >
          <FaTrash></FaTrash>
        </button>
      </div>
      {/* modal  */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <h3 className="font-bold text-lg">Are your sure?</h3>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => removeItemFromFav(pId)}
                className="btn btn-sm text-white hover:bg-orange-400 bg-orange-400 "
              >
                yes
              </button>
              <button className="btn btn-sm text-white hover:bg-green-600 bg-green-500 ">
                No
              </button>
            </div>
          </form>
        </div>
      </dialog>
      {/* modal end */}
    </div>
  );
};

export default FavCard;
