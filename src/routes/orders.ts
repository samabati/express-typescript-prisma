import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import { createOrder } from "../controllers/orders";

const orderRouter = Router();

orderRouter.post("/", [authMiddleware], errorHandler(createOrder));

export default orderRouter;
