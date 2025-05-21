import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../Redux/hooks";
import { useGetUserFavMenuQuery } from "../../Redux/api/favMenuApi/favMenuApi";

const CartFavButton = () => {
  const { user } = useAppSelector((state) => state.auth);

  const { cartItems } = useAppSelector((state) => state.cart);

  const { data: favData } = useGetUserFavMenuQuery(undefined, {
    skip: !user || user?.role !== "customer",
  });
  return (
    <>
      <div className="top-20 fixed flex flex-col gap-2 bg-orange-400 z-[1] rounded-xl shadow-md ">
        <div className="indicator text-white  ">
          <span className="indicator-item badge badge-warning text-xs font-medium text-white">
            {cartItems.length}
          </span>
          <Link
            to={"/user-cart-items"}
            className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"
          >
            <FaShoppingCart></FaShoppingCart>
          </Link>
        </div>
        <div className="indicator text-white ">
          <span className="indicator-item badge badge-success bg-green-600  text-xs font-medium text-white">
            {favData?.products ? favData?.products.length : 0}
          </span>
          <Link
            to={"/user-fav-items"}
            className="p-3 text-lg hover:scale-90 hover:text-orange-100 duration-500"
          >
            <FaHeart />
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartFavButton;
