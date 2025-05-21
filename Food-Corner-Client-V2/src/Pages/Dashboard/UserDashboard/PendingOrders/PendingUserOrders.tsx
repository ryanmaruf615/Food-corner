import LoadingUi from "../../../../components/common/LoadingUi/LoadingUi";
import { OrderTable } from "../../../../components/common/Order/OrderTable";
import ReactHelemt from "../../../../components/common/ReactHelmet/ReactHelemt";
import SectionHeader from "../../../../components/common/SectionHeader/SectionHeader";
import { Effect } from "../../../../components/FramerMotion/Effect";
import { useUserAllPendingOrdersQuery } from "../../../../Redux/api/orderApi/orderApi";

const PendingUserOrders = () => {
  const { data, isLoading } = useUserAllPendingOrdersQuery("", {
    pollingInterval: 30000,
  });
  console.log(data);
  const orderData = data?.data;

  return (
    <div>
      <ReactHelemt title=": Pending-Orders"></ReactHelemt>
      <SectionHeader text="Pending Orders"></SectionHeader>
      {isLoading ? (
        <LoadingUi></LoadingUi>
      ) : (
        <div>
          <Effect>
            {" "}
            <OrderTable orders={orderData!}></OrderTable>
          </Effect>
        </div>
      )}
    </div>
  );
};

export default PendingUserOrders;
