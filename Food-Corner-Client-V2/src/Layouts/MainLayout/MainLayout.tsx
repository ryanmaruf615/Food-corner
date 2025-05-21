import { Outlet } from "react-router-dom";
import Navbar from "../../components/common/navbar/Navbar";
import Footer from "../../components/common/footer/Footer";
import CartFavButton from "./CartFavButton";
import { useAppSelector } from "../../Redux/hooks";

const MainLayout = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <Navbar />
      <div className="min-h-[70vh]">
        {user?.role == "customer" && <CartFavButton></CartFavButton>}
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
