import PendingOrders from "../../Pages/Dashboard/AdminDashboard/PendingOrders/PendingOrders";
import AdminDashboard from "../../Pages/Dashboard/AdminDashboard/AdminDashboard";
import AddItem from "../../Pages/Dashboard/AdminDashboard/AddItem/AddItem";
import ManageItem from "../../Pages/Dashboard/AdminDashboard/ManageItems/ManageItem";
import Allorders from "../../Pages/Dashboard/AdminDashboard/AllOrders/Allorders";
import AddCusineCategory from "../../Pages/Dashboard/AdminDashboard/AddCuisineCategory/AddCusineCategory";
import { ManageCuisineCategory } from "../../Pages/Dashboard/AdminDashboard/EditCategoryCuisine/ManageCuisineCategory";
import UserMessage from "../../Pages/Dashboard/AdminDashboard/UserMessage/UserMessage";
import AddAdmin from "../../Pages/Dashboard/SuperAdmin/AddAdmin/AddAdmin";
import ManageAdmin from "../../Pages/Dashboard/SuperAdmin/ManageAdmin/ManageAdmin";

export const adminRouteOption = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Menu Management",
    children: [
      {
        name: "Add Item",
        path: "add-item",
        element: <AddItem />,
      },
      {
        name: "Manage Item",
        path: "manage-item",
        element: <ManageItem />,
      },

      {
        name: "Add Category/Cuisine",
        path: "add-category-cuisine",
        element: <AddCusineCategory />,
      },
      {
        name: "Edit Category/Cuisine",
        path: "edit-category-cuisine",
        element: <ManageCuisineCategory />,
      },
    ],
  },
  {
    name: "Order Management",
    children: [
      {
        name: "All Orders",
        path: "all-orders",
        element: <Allorders />,
      },
      {
        name: "Pending Orders",
        path: "pending-orders",
        element: <PendingOrders />,
      },
    ],
  },
  {
    name: "User Queries",
    path: "user-msg",
    element: <UserMessage />,
  },
  {
    name: "Admin Management",
    children: [
      {
        name: "Add Admin",
        path: "add-admin",
        element: <AddAdmin />,
      },
      {
        name: "Manage Admin",
        path: "manage-admin",
        element: <ManageAdmin />,
      },
    ],
  },
];
