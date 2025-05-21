import { Link } from "react-router-dom";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { useAdminDashboardInfoQuery } from "../../../Redux/api/dashboardDataApi/dashboardDataApi";
import LoadingUi from "../../../components/common/LoadingUi/LoadingUi";
import ReactHelemt from "../../../components/common/ReactHelmet/ReactHelemt";

const AdminDashboard = () => {
  const { data, isLoading } = useAdminDashboardInfoQuery("", {
    pollingInterval: 30000,
  });

  return (
    <div className="min-h-[calc(100vh-15vh)]">
      <ReactHelemt title=": Admin-Dashboard"></ReactHelemt>
      <SectionHeader text="Admin Dashboard"></SectionHeader>

      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <div className="  h-full  relative">
          <div
            className="container my-5
      mx-auto px-2 flex gap-5 justify-center flex-wrap"
          >
            <div className="w-80 h-32 border-2 rounded-lg  border-orange-400 flex justify-center items-center">
              <div className="flex justify-center flex-col gap-1">
                <Link
                  to={"/admin/all-orders"}
                  className="text-xl  font-bold text-orange-400"
                >
                  All Orders
                </Link>
                <p className="text-orange-400 text-center font-bold text-3xl">
                  {data?.data?.allOrderCount}
                </p>
              </div>
            </div>
            <div className="w-80 h-32 border-2 rounded-lg  border-orange-400 flex justify-center items-center">
              <div className="flex justify-center flex-col gap-1">
                <Link
                  to={"/admin/pending-orders"}
                  className="text-xl  font-bold text-orange-400"
                >
                  Pending Orders
                </Link>
                <p className="text-orange-400 text-center font-bold text-3xl">
                  {data?.data?.pendingOrderCount}
                </p>
              </div>
            </div>
            <div className="w-80 h-32 border-2 rounded-lg  border-orange-400 flex justify-center items-center">
              <div className="flex justify-center flex-col gap-1">
                {" "}
                <p className="text-xl  font-bold text-green-500">
                  Todays Completed Orders
                </p>{" "}
                <p className="text-orange-400 text-center font-bold text-3xl">
                  {data?.data?.todayDeliveryOrderCount}
                </p>{" "}
              </div>
            </div>

            <div className="w-80 h-32 border-2 rounded-lg  border-orange-400 flex justify-center items-center">
              <div className="flex justify-center flex-col gap-1">
                {" "}
                <p className="text-xl  font-bold text-green-500">
                  Registered user
                </p>{" "}
                <p className="text-orange-400 text-center font-bold text-3xl">
                  {data?.data?.totalUser}
                </p>{" "}
              </div>
            </div>
          </div>
          <div className="mt-20 container mx-auto gap-10 flex justify-center flex-wrap ">
            <div className=" w-64 xs:w-72 sm:w-80">
              <p className="text-xl font-bold text-orange-400 text-center">
                Populer Menu
              </p>

              <PieChart topItem={data?.data?.topItem}></PieChart>
            </div>
            <div className="w-full lg:w-[750px] h-64 md:h-96 flex justify-center mb-10">
              <LineChart monthlyIncome={data?.data?.monthlyIncome}></LineChart>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
