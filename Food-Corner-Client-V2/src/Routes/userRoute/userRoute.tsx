import AllOrderbyUser from "../../Pages/Dashboard/UserDashboard/AllOrders/AllOrderbyUser";
import PendingUserOrders from "../../Pages/Dashboard/UserDashboard/PendingOrders/PendingUserOrders";
import UserDashboard from "../../Pages/Dashboard/UserDashboard/UserDashboard";

export const userRouteOption = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard></UserDashboard>,
  },
  {
    name: "All Orders",
    path: "orders-users",
    element: <AllOrderbyUser />,
  },
  {
    name: "Pending Orders",
    path: "pending-orders-users",
    element: <PendingUserOrders />,
  },
];
