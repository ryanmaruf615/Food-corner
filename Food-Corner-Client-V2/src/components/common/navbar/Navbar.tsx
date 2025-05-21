import { Link, NavLink } from "react-router-dom";
import { useAppSelector } from "../../../Redux/hooks";
import { decodeToken } from "../../../utils/decodeToken";
import { JwtPayload } from "jwt-decode";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../Redux/feature/userSlice/userSlice";
import logo from "../../../assets/logo.png";
import { useGetCustomerInfoQuery } from "../../../Redux/api/userApi/userApi";

const Navbar = () => {
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.auth);
  let user;

  if (token) {
    user = decodeToken(token) as JwtPayload & {
      role: string;
      userEmail: string;
    };
  }

  const { data } = useGetCustomerInfoQuery("", {
    skip: !user || user?.role === "superAdmin",
  });
  console.log(data);
  const navLink = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-400 hover:bg-orange-400  border-none shadow-none outline-none btn btn-sm text-white  px-3 py-1 "
              : "   bg-transparent hover:text-white hover:bg-orange-400 outline-none shadow-none text-orange-400 border-none  btn btn-sm  duration-300 z-10 "
          } // Apply styles based on active state
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/food-item"
          className={({ isActive }) =>
            isActive
              ? "bg-orange-400 hover:bg-orange-400  border-none shadow-none outline-none btn btn-sm text-white  px-3 py-1 "
              : "   bg-transparent hover:text-white hover:bg-orange-400 outline-none shadow-none text-orange-400 border-none  btn btn-sm  duration-300 z-10 "
          } // Apply styles based on active state
        >
          Food Item
        </NavLink>
      </li>

      <li>
        {token && (
          <NavLink
            to={`/${
              user?.role === "admin" || user?.role === "superAdmin"
                ? "admin"
                : "customer"
            }/dashboard`}
            className={({ isActive }) =>
              isActive
                ? "bg-orange-400 hover:bg-orange-400  border-none shadow-none outline-none btn btn-sm text-white  px-3 py-1 "
                : "   bg-transparent hover:text-white hover:bg-orange-400 outline-none shadow-none text-orange-400 border-none  btn btn-sm  duration-300 z-10 "
            } // Apply styles based on active state
          >
            Dashboard
          </NavLink>
        )}
      </li>
    </>
  );
  return (
    <div className="navbar   font-medium ">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="ms-1 bg-none text-orange-400 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className=" flex flex-col lg:hidden gap-3 dropdown-content z-10 bg-white rounded-box  mt-3 w-52 py-3 px-5 shadow"
          >
            {navLink}
          </ul>
        </div>
        <Link
          to={"/"}
          className="px-2 flex items-center font-bold cursor-pointer text-xl text-orange-400"
        >
          <img width={50} src={logo} alt="" />
          <p>FOOD-CORNER</p>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className=" flex gap-5 relative px-1">{navLink}</ul>
      </div>
      <div className="navbar-end">
        {user?.userEmail ? (
          <details className="dropdown p-0 m-0 dropdown-end">
            <summary className="avatar m-1">
              <div className="w-10 rounded-full">
                <img
                  src={
                    data?.data?.photo ||
                    "https://png.pngtree.com/png-vector/20190130/ourmid/pngtree-characters-enjoy-food-cartoon-characters-gourmet-hand-painted-character-cuisine-enjoy-png-image_606799.jpg"
                  }
                />
              </div>
            </summary>
            <ul className="menu grid gap-2 dropdown-content bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
              {user.role !== "superAdmin" && (
                <li>
                  <Link to="/user-profile" className="text-nowrap">
                    Manage Profile
                  </Link>
                </li>
              )}
              <li
                onClick={() => dispatch(userLogout())}
                className="btn hover:bg-orange-500 btn-sm text-white bg-orange-400 border-none "
              >
                Logout
              </li>
            </ul>
          </details>
        ) : (
          <Link
            to="/user-login"
            className="btn btn-sm hover:bg-orange-500 text-white bg-orange-400 border-none "
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
