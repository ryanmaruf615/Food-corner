import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { ICartItem } from "../../interface/cartItem.iterface";
import { useAppDispatch } from "../../Redux/hooks";
import {
  decreassItem,
  increassItem,
  removeItemFromCart,
} from "../../Redux/feature/cartSlice/cartSlice";

const CartCard = ({ itemData }: { itemData: ICartItem }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="border border-orange-400 rounded-lg flex p-3 gap-5 flex-wrap justify-between items-center  ">
      <div className=" flex gap-2 items-center ">
        <div className="w-20 h-20 rounded-lg bg-orange-400">
          <img
            className="w-20 h-20 object-cover rounded-md"
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
          <span className="text-green-500">Size:</span>{" "}
          {itemData.size.includes(":")
            ? itemData.size
            : `${itemData.size} inch`}
        </div>
        <div className="font-semibold">
          <span className="text-green-500">Price:</span> {itemData.price} tk
        </div>
      </div>

      <div className="flex justify-end ms-auto lg:ms-0  items-center   gap-5 ">
        <button
          onClick={() =>
            dispatch(decreassItem({ id: itemData.id, size: itemData.size }))
          }
          className="font-semibold w-6 h-6 text-white flex justify-center items-center text-sm rounded-full bg-orange-400"
        >
          <FaMinus></FaMinus>
        </button>
        <div className="font-semibold text-center border px-4 rounded-md">
          {itemData.quantity}
        </div>
        <button
          onClick={() =>
            dispatch(increassItem({ id: itemData.id, size: itemData.size }))
          }
          className="font-semibold w-6 h-6 text-white flex justify-center items-center text-sm rounded-full bg-green-500"
        >
          <FaPlus></FaPlus>
        </button>

        <div
          onClick={() => dispatch(removeItemFromCart(itemData.id))}
          className=" w-7 ms-5   h-7 flex justify-center text-sm items-center  text-orange-400 bg-white hover:bg-orange-400 hover:text-white duration-200 top-[-10px]  border border-red-500 p-1 rounded-full"
        >
          <FaTrash></FaTrash>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
