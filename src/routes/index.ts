import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import addressRouter from "./addresses";
import userRouter from "./user";
import cartRouter from "./carts";
import orderRouter from "./orders";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/addresses", addressRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/carts", cartRouter);
rootRouter.use("/orders", orderRouter);

export default rootRouter;
