import { IOrderResponse } from "../../../interface/order.interface";

interface IOrderDetailsProps {
  order: IOrderResponse;
}

export const OrderDetails = ({ order }: IOrderDetailsProps) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      <div className="bg-base-200 p-4 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold">Customer Information</h3>
        <p>
          <strong>Name:</strong> {order.customerId.name.firstName}{" "}
          {order.customerId.name.middleName} {order.customerId.name.lastName}
        </p>
        <p>
          <strong>Email:</strong> {order.customerId.email}
        </p>
        <p>
          <strong>Contact No:</strong> {order.customerId.contactNo}
        </p>
        <p>
          <strong>Address:</strong> {order.customerId.address}
        </p>
      </div>

      <div className="bg-base-200 p-4 rounded-lg shadow-lg mt-4">
        <h3 className="text-xl font-semibold">Order Items</h3>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li
              key={item._id}
              className="flex items-center space-x-4 border-b pb-2"
            >
              <img
                src={item.productId.photo}
                alt={item.productId.title}
                className="w-16 h-16"
              />
              <div>
                <h4 className="font-bold">{item.productId.title}</h4>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Subtotal: $
                  {
                    item.productId.price.find((p) => p.size === item.size)
                      ?.price
                  }
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-base-200 p-4 rounded-lg shadow-lg mt-4">
        <h3 className="text-xl font-semibold">Order Summary</h3>
        <p>
          <strong>Transaction ID:</strong> {order.transectionId}
        </p>
        <p>
          <strong>Total Price:</strong> ${order.total.totalPrice}
        </p>
        <p>
          <strong>Discount:</strong> ${order.total.discount}
        </p>
        <p>
          <strong>Subtotal:</strong> ${order.total.subTotal}
        </p>
        <p>
          <strong>Payment Status:</strong> {order.paymentStatus}
        </p>
        <p>
          <strong>Delivery Status:</strong> {order.deliveryStatus}
        </p>
        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
