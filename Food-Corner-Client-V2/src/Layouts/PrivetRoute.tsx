import { ReactNode } from "react";
import { decodeToken } from "../utils/decodeToken";
import { JwtPayload } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../Redux/hooks";
import { userLogout } from "../Redux/feature/userSlice/userSlice";
import { Navigate, useLocation } from "react-router-dom";

const PrivetRoute = ({
  role,
  children,
}: {
  role: string[];
  children: ReactNode;
}) => {
  const location = useLocation();
  console.log(location.pathname);
  let user;
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/user-login"}></Navigate>;
  }

  if (token) {
    user = decodeToken(token) as JwtPayload & {
      role: string;
      userEmail: string;
    };
  }

  if (!user) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/user-login"}></Navigate>;
  }

  if (!role.includes(user?.role)) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/user-login"}></Navigate>;
  }

  if (!role.includes(user?.role)) {
    dispatch(userLogout());
    return <Navigate replace={true} to={"/user-login"}></Navigate>;
  }

  if (
    role.includes(user?.role) &&
    user?.role !== "superAdmin" &&
    (location.pathname.includes("manage-admin") ||
      location.pathname.includes("add-admin"))
  ) {
    return <Navigate replace={true} to="/user-login" />;
  }

  return <div>{children}</div>;
};

export default PrivetRoute;
