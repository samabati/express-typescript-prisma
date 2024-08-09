import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  cancelOrder,
  createOrder,
  listOrderById,
  listOrders,
} from "../controllers/orders";

const orderRouter = Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));
orderRouter.get("/", [authMiddleware], errorHandler(listOrders));
orderRouter.get("/:id", [authMiddleware], errorHandler(listOrderById));
orderRouter.delete("/:id", [authMiddleware], errorHandler(cancelOrder));

export default orderRouter;
