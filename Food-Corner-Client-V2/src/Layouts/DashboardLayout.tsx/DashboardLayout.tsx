import { NavLink, Outlet } from "react-router-dom";
import {
  ISidebarItem,
  sideNavLinkGenerator,
} from "../../utils/sideNavLinkGenerator";
import { userRouteOption } from "../../Routes/userRoute/userRoute";
import { useAppSelector } from "../../Redux/hooks";
import { decodeToken } from "../../utils/decodeToken";
import { JwtPayload } from "jwt-decode";
import { adminRouteOption } from "../../Routes/adminRoute/adminRoute";
import { FaArrowAltCircleRight } from "react-icons/fa";

const userRole = {
  ADMIN: "admin",
  SUPER_ADMIN: "superAdmin",
  FACULTY: "faculty",
  USER: "customer",
};

const DashboardLayout = () => {
  const { token } = useAppSelector((state) => state.auth);
  let user: (JwtPayload & { role: string; userEmail: string }) | null = null;

  if (token) {
    user = decodeToken(token) as JwtPayload & {
      role: string;
      userEmail: string;
    };
  }
  let sideBarItems;

  switch (user?.role) {
    case userRole.ADMIN:
      sideBarItems = sideNavLinkGenerator(adminRouteOption, userRole.ADMIN);
      break;
    case userRole.SUPER_ADMIN:
      sideBarItems = sideNavLinkGenerator(adminRouteOption, userRole.ADMIN);
      break;

    case userRole.USER:
      sideBarItems = sideNavLinkGenerator(userRouteOption, userRole.USER);
      break;

    default:
      break;
  }

  return (
    <div className="drawer   lg:drawer-open  ">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content relative  ">
        <label
          htmlFor="my-drawer-2"
          className=" flex justify-center items-center text-white text-xl rounded-md absolute top-6 left-1 z-[1] bg-orange-300 shadow-md  w-12 h-10 drawer-button lg:hidden"
        >
          <FaArrowAltCircleRight></FaArrowAltCircleRight>
        </label>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>
      <div className="drawer-side z-[2]">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-orange-400 border-r-2 border-white-400   flex flex-col gap-3 text-base-content h-full w-72 p-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-white  text-orange-400  border-2 border-white   p-2 rounded-md z-10 "
                : " hover:bg-white hover:text-orange-400  bg-orange-400 border-2 border-white rounded-md p-2 duration-300  text-white "
            } // Apply styles based on active state
            to="/"
          >
            Home
          </NavLink>
          {user && (
            <>
              {" "}
              {sideBarItems?.map((item: ISidebarItem) => {
                if (item.key && item.label && !item.children) {
                  return (
                    <NavLink
                      key={item.key}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-white  text-orange-400  border-2 border-white   p-2 rounded-md z-10 "
                          : " hover:bg-white hover:text-orange-400  bg-orange-400 border-2 border-white rounded-md p-2 duration-300  text-white "
                      } // Apply styles based on active state
                      to={item.label}
                    >
                      {item.key}
                    </NavLink>
                  );
                }
                if (
                  item.children &&
                  (user.role !== "admin" || item.key !== "Admin Management")
                ) {
                  return (
                    <details key={item.key}>
                      <summary className="bg-orange-400 border-2 border-white text-white font-semibold  px-3 py-2 rounded">
                        {item.key}
                      </summary>
                      <div className="p-4  md:rounded-md flex flex-col   gap-3 ">
                        {item?.children.map((item: ISidebarItem) => {
                          return (
                            <NavLink
                              key={item.key}
                              className={({ isActive }) =>
                                isActive
                                  ? "bg-white  text-orange-400  border-2 border-white   p-2 rounded-md z-10 "
                                  : " hover:bg-white hover:text-orange-400  bg-orange-400 border-2 border-white rounded-md p-2 duration-300  text-white "
                              }
                              to={item.label}
                            >
                              {item.key}
                            </NavLink>
                          );
                        })}
                      </div>
                    </details>
                  );
                }
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
