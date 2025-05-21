import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import FoodItem from "../Pages/FoodItemPage/FoodItem";
import Login from "../Pages/LoginPage/Login";
import Signup from "../Pages/SignupPage/Signup";

import { generatedRoute } from "../utils/routeGenerator";
import { userRouteOption } from "./userRoute/userRoute";
import DashboardLayout from "../Layouts/DashboardLayout.tsx/DashboardLayout";
import PrivetRoute from "../Layouts/PrivetRoute";
import { adminRouteOption } from "./adminRoute/adminRoute";
import FoodDetails from "../Pages/FoodDetailsPage/FoodDetails";
import CartItems from "../Pages/CartPage/CartItems";
import FavItems from "../Pages/FavItemPage/FavItems";
import { ContactUs } from "../Pages/ContactUs/ContactUs";
import AboutUs from "../Pages/AboutUs/AboutUs";
import UserProfile from "../Pages/UserProfile/UserProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/food-item",
        element: <FoodItem />,
      },
      {
        path: "/food-item/:id",
        element: <FoodDetails />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/user-profile",
        element: (
          <PrivetRoute role={["customer", "admin"]}>
            <UserProfile />
          </PrivetRoute>
        ),
      },

      {
        path: "/user-cart-items",
        element: (
          <PrivetRoute role={["customer"]}>
            {" "}
            <CartItems />
          </PrivetRoute>
        ),
      },
      {
        path: "/user-fav-items",
        element: (
          <PrivetRoute role={["customer"]}>
            <FavItems />
          </PrivetRoute>
        ),
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
    ],
  },
  {
    path: "/customer",
    element: (
      <PrivetRoute role={["customer"]}>
        {" "}
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: generatedRoute(userRouteOption),
  },
  {
    path: "/admin",
    element: (
      <PrivetRoute role={["admin", "superAdmin"]}>
        {" "}
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: generatedRoute(adminRouteOption),
  },
  {
    path: "/user-login",
    element: <Login></Login>,
  },
  {
    path: "/user-signup",
    element: <Signup></Signup>,
  },
]);
