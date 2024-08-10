import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  cancelOrder,
  changeOrderStatus,
  createOrder,
  listAllOrders,
  listOrderById,
  listOrders,
  listUserOrders,
} from "../controllers/orders";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const orderRouter = Router();

orderRouter.get(
  "/index",
  [authMiddleware, adminMiddleware],
  errorHandler(listAllOrders)
);
orderRouter.put(
  "/status/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(changeOrderStatus)
);
orderRouter.get(
  "/users/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(listUserOrders)
);
orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrders));
orderRouter.get("/:id", [authMiddleware], errorHandler(listOrderById));
orderRouter.delete("/:id", [authMiddleware], errorHandler(cancelOrder));

export default orderRouter;
