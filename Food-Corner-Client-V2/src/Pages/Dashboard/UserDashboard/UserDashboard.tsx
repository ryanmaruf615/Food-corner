import LoadingUi from "../../../components/common/LoadingUi/LoadingUi";
import ReactHelemt from "../../../components/common/ReactHelmet/ReactHelemt";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import { Effect } from "../../../components/FramerMotion/Effect";
import {
  IOrderProduct,
  IOrderResponse,
} from "../../../interface/order.interface";
import { useUserDashboardInfoQuery } from "../../../Redux/api/dashboardDataApi/dashboardDataApi";

const UserDashboard = () => {
  const { data, isLoading } = useUserDashboardInfoQuery("", {
    pollingInterval: 30000,
  });

  console.log(data);
  return (
    <div className=" min-h-[100vh]">
      <ReactHelemt title=": User-Dashboard"></ReactHelemt>
      <SectionHeader text="User Dashboard"></SectionHeader>

      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <Effect>
          {" "}
          <div className="relative min-h-[calc(100vh-15.3vh)] ">
            <div>
              <div
                className="container p-4
 mx-auto px-2 flex gap-5 justify-center flex-wrap"
              >
                <div className="w-80 h-32  border-2 rounded-lg  border-orange-400 flex justify-center items-center">
                  <div className="flex justify-center flex-col gap-1">
                    <p className="text-xl  font-bold ">Pending Orders</p>
                    <p className="text-orange-400 text-center font-bold text-3xl">
                      {data?.data?.pendingOrderCount}
                    </p>
                  </div>
                </div>
                <div className="w-80 h-32 border-2 rounded-lg  border-orange-400 flex justify-center items-center">
                  <div className="flex justify-center flex-col gap-1">
                    <p className="text-xl  font-bold ">All Orders</p>
                    <p className="text-green-500 text-center font-bold text-3xl">
                      {data?.data?.totalOrders}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid  md:grid-cols-2">
              <div className="flex flex-col  my-10">
                <p className="text-2xl rounded-3xl pb-2 border-orange-400  text-nowrap mx-auto font-bold px-4 border-b-2">
                  Present Order Status
                </p>
                {data?.data?.presentOrders?.map(
                  (item: Partial<IOrderResponse>) => (
                    <div
                      key={item._id}
                      className="mx-2 grid border grid-cols-1 mt-10 rounded-2xl  shadow p-5  "
                    >
                      <div className="text-lg font-semibold flex-col">
                        <ul>
                          {item?.items?.map((item, i) => (
                            <div
                              key={i}
                              className="grid grid-cols-3 my-1 gap-3"
                            >
                              <p>{item?.productId?.title}</p>
                              <p>Size: {item?.size}</p>
                              <img
                                className="w-14 ms-auto h-14 object-cover rounded-md"
                                src={item?.productId?.photo}
                                alt="das"
                              />
                            </div>
                          ))}
                        </ul>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="text-center font-bold">
                          {" "}
                          <p className="text-green-500">Status</p>
                          <p className="font-normal ">{item?.deliveryStatus}</p>
                        </div>
                        <div className=" font-bold">
                          {" "}
                          <p className="">Total Paid:</p>
                          <p className="font-normal ">
                            {item.total?.subTotal} tk.
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="flex flex-col justify-center my-10">
                <p className="text-2xl rounded-3xl  border-orange-400 mx-auto font-bold px-4  border-b-2  pb-2 ">
                  Last Order
                </p>

                {!!data?.data?.lastOrders &&
                  Object.keys(data.data.lastOrders).length !== 0 && (
                    <div className="mx-2 grid border grid-cols-1 mt-10 rounded-2xl shadow p-5  ">
                      <div className="text-lg   font-semibold flex-col">
                        <div className="">
                          {data?.data?.lastOrders?.items?.map(
                            (item: IOrderProduct, i: number) => (
                              <div
                                key={i}
                                className="grid gap-3 grid-cols-3 my-1"
                              >
                                <p>{item?.productId?.title}</p>
                                <p>
                                  Size:{" "}
                                  {item?.size.includes(":") ? (
                                    item?.size
                                  ) : (
                                    <span>
                                      {item?.size}
                                      {'"'}
                                    </span>
                                  )}
                                </p>
                                <img
                                  className="w-14 ms-auto h-14 object-cover rounded-md"
                                  src={item?.productId?.photo}
                                  alt="das"
                                />
                              </div>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <div className="text-center font-bold">
                          {" "}
                          <p className="text-green-500">Status</p>
                          <p className="font-normal ">
                            {data?.data?.lastOrders?.deliveryStatus}
                          </p>
                        </div>
                        <div className="font-bold">
                          {" "}
                          <p className="">Total Paid:</p>
                          <p className="font-normal ">
                            {data?.data?.lastOrders?.total?.subTotal} tk.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Effect>
      )}
    </div>
  );
};

export default UserDashboard;
