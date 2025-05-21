import { JwtPayload } from "jsonwebtoken";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { IAuthUserInfo } from "../../interface/global.interface";
import { Customer } from "../Customers/custommer.model";
import { initiatePayment } from "./payment/payment.utils";
import { AppError } from "../../Errors/AppError";
import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderIntoDB = async (
  orderData: Partial<IOrder>,
  userData: JwtPayload & { role: string; userEmail: string }
) => {
  const customerData = await Customer.findOne({ email: userData.userEmail });

  const txn = `TXN-${Date.now()}${userData.userEmail}`;

  const result = await Order.create({
    ...orderData,
    customerId: customerData?._id,
    transectionId: txn,
  });

  const paymentInfo = await initiatePayment({
    orderData: result.total,
    txn,
    customerData,
    orderId: result._id,
  });

  return { ...result, payLink: paymentInfo.data.payment_url };
};
const getAllOrderFromDB = async (queryParams: Record<string, unknown>) => {
  const allOrderQuery = new QueryBuilder(
    Order.find() // Create the base query for Order
      .populate({
        path: "customerId",
        select: "name contactNo email address",
      })
      .populate({
        path: "items.productId",
        select: "title price category photo",
      }),
    queryParams
  )
    .search(["transectionId"]) // Replace with searchable fields
    .filter()
    .sort()
    .paginate();

  const results = await allOrderQuery.modelQuery;
  const meta = await allOrderQuery.countTotal();
  return { results, meta };
};
const getAllPendingOrderFromDB = async () => {
  const result = await Order.find({
    deliveryStatus: { $ne: "delivered" },
    isCancel: false,
  })
    .sort({ createdAt: -1 })
    .populate({
      path: "customerId",
      select: "name contactNo email address ",
    })
    .populate({
      path: "items.productId",
      select: "title price category photo ",
    });

  return result;
};

const updateOrderFromDB = async (id: string, status: string) => {
  const order = await Order.findById(id);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, "Order not found");
  }

  const { deliveryStatus } = order;

  if (deliveryStatus === status) {
    throw new AppError(httpStatus.BAD_REQUEST, `Status is already ${status}`);
  }

  if (
    deliveryStatus === "delivered" &&
    (status === "onGoing" || status === "pending")
  ) {
    throw new AppError(httpStatus.BAD_REQUEST, "Status is already delivered.");
  }

  if (deliveryStatus === "pending" && status === "delivered") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Status cannot be updated to delivered directly"
    );
  }

  if (deliveryStatus === "onGoing" && status === "pending") {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Status cannot be updated to pending from onGoing"
    );
  }

  const result = await Order.findByIdAndUpdate(
    id,
    { deliveryStatus: status },
    { new: true } // To return the updated document
  );
  return result;
};

const getUsersOrderFromDB = async (
  userdata: JwtPayload & IAuthUserInfo,
  queryParams: Record<string, unknown>
) => {
  const userEmail = userdata.userEmail;
  const customer = await Customer.findOne({ email: userEmail });

  const allOrderQuery = new QueryBuilder(
    Order.find({ customerId: customer?._id }) // Create the base query for Order
      .populate({
        path: "customerId",
        select: "name contactNo email address",
      })
      .populate({
        path: "items.productId",
        select: "title price category photo",
      }),
    queryParams
  )
    .search(["transectionId"]) // Replace with searchable fields
    .filter()
    .sort()
    .paginate();

  const results = await allOrderQuery.modelQuery;
  const meta = await allOrderQuery.countTotal();
  return { results, meta };
};

const getUsersPendingOrderFromDB = async (
  userdata: JwtPayload & IAuthUserInfo,
  queryParams: Record<string, unknown>
) => {
  const userEmail = userdata.userEmail;
  const customer = await Customer.findOne({ email: userEmail });

  const allOrderQuery = new QueryBuilder(
    Order.find({ customerId: customer?._id, deliveryStatus: "pending" }) // Create the base query for Order
      .populate({
        path: "customerId",
        select: "name contactNo email address",
      })
      .populate({
        path: "items.productId",
        select: "title price category photo",
      }),
    queryParams
  )
    .search(["transectionId"]) // Replace with searchable fields
    .filter()
    .sort()
    .paginate();

  const results = await allOrderQuery.modelQuery;
  const meta = await allOrderQuery.countTotal();
  return { results, meta };
};

export const orderService = {
  createOrderIntoDB,
  getAllOrderFromDB,
  getUsersOrderFromDB,
  getAllPendingOrderFromDB,
  updateOrderFromDB,
  getUsersPendingOrderFromDB,
};
