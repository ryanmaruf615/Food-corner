/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import { OrderTable } from "../../../../components/common/Order/OrderTable";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import {
  useGetAllPendingOrdersQuery,
  useUpdateOrderMutation,
} from "../../../../Redux/api/orderApi/orderApi";
import { IApiResponse } from "../../../../Redux/interface/global.interface";
import ReactHelemt from "../../../../components/common/ReactHelmet/ReactHelemt";
import { Effect } from "../../../../components/FramerMotion/Effect";

const PendingOrders = () => {
  const { data, isLoading } = useGetAllPendingOrdersQuery("", {
    pollingInterval: 40000,
  });
  const [updateOrder] = useUpdateOrderMutation();

  const handleDeliveryStatus = async (orderId: string, status: string) => {
    const res = (await updateOrder({
      id: orderId,
      status: status,
    })) as IApiResponse<any>;

    if (res.data?.success) {
      toast.success(res.data.message);
    }
  };

  return (
    <div className="">
      <ReactHelemt title=": Pending-Orders"></ReactHelemt>
      <SectionHeader text="Pending Orders" />
      <div className=" ">
        {isLoading ? (
          <LoadingUi />
        ) : (
          <Effect>
            {" "}
            <OrderTable
              handleDeliveryStatus={handleDeliveryStatus}
              orders={data!}
              isAction={true}
            />
          </Effect>
        )}
      </div>
    </div>
  );
};

export default PendingOrders;
