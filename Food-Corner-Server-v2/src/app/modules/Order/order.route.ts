import { Router } from "express";
import { orderController } from "./order.controller";
import { auth } from "../../middlewares/auth/auth";

const router = Router();

router.post("/make-payment", auth("customer"), orderController.orderProduct);

router.get("/myOrder", auth("customer"), orderController.getUsersAllOrder);
router.get(
  "/myOrder-pending",
  auth("customer"),
  orderController.getUsersAllPendingOrder
);

//admin route
router.get("/", auth("admin", "superAdmin"), orderController.getAllorder);

router.get(
  "/pending",
  auth("admin", "superAdmin"),
  orderController.getPendingOrder
);
router.patch("/:id", auth("admin", "superAdmin"), orderController.updateOrder);

export const orderRouter = router;
