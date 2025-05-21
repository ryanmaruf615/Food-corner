/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrderResponse } from "../../../interface/order.interface";

interface OrderTableProps {
  orders: IOrderResponse[]; // Correctly specify orders as IOrderResponse[]
  isAction?: boolean;
  handleDeliveryStatus?: (orderId: string, status: string) => Promise<void>;
  isFetching?: boolean;
  canReview?: boolean;
  openModal?: (itemData: any) => void;
  cheight?: number;
}

export const OrderTable = ({
  canReview = false,
  orders,
  isAction = false,
  handleDeliveryStatus,
  isFetching = false,
  openModal,
  cheight = 0,
}: OrderTableProps) => {
  const computedHeight = `calc(100vh - ${cheight + 94}px)`;
  return (
    <div
      style={{ height: computedHeight }}
      className={`overflow-auto custom-scrollbar 
         mt-1`}
    >
      <table className="table table-pin-rows w-full">
        <thead className="  ">
          <tr className="bg-orange-400 text-white">
            <th>Email</th>
            <th>Product Details</th>
            <th>Subtotal Price</th>
            <th>Transaction ID</th>
            <th>Payment Status</th>
            <th>Delivery Status</th>
          </tr>
        </thead>
        <tbody>
          {isFetching ? (
            <tr className="mt-5 ">
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
              <td>Loading...</td>
            </tr>
          ) : (
            <>
              {orders?.map((order) => (
                <tr key={order._id}>
                  <td>{order.customerId.email}</td>
                  <td className="min-w-72">
                    <ul>
                      {order.items?.map((item) => (
                        <li key={item._id} className="flex items-center">
                          <img
                            src={item.productId.photo}
                            alt={item.productId.title}
                            className="w-16 h-16 object-cover mr-2 my-0.5"
                          />
                          <span>
                            {item.productId.title} (Size: {item.size}, Quantity:{" "}
                            {item.quantity})
                          </span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>{order.total.subTotal}tk</td>
                  <td>{order.transectionId}</td>
                  <td>{order.paymentStatus}</td>
                  <td className="min-w-40">
                    {isAction && !!handleDeliveryStatus ? (
                      <select
                        onChange={(e) => {
                          handleDeliveryStatus(order._id, e.target.value);
                        }}
                        defaultValue={order.deliveryStatus} // Corrected the spelling here
                        className="select select-sm select-bordered w-full max-w-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="onGoing">Ongoing</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    ) : (
                      <p className="my-1 font-bold">
                        {order.deliveryStatus.toUpperCase()}
                      </p>
                    )}
                    {canReview && order.deliveryStatus == "delivered" && (
                      <button
                        onClick={() =>
                          openModal &&
                          openModal({
                            menuData: order?.items
                              ?.filter((item, index, self) => {
                                return (
                                  index ==
                                  self.findIndex(
                                    (t) =>
                                      t.productId._id === item.productId._id
                                  )
                                );
                              })
                              .map((item) => ({
                                name: item.productId.title,
                                id: item.productId._id,
                              })),
                            orderId: order._id,
                          })
                        }
                        className="btn
                    btn-sm bg-orange-400 hover:bg-orange-400 text-white duration-300"
                      >
                        Give Review
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};
