import { Router } from "express";
import authRoutes from "./auth";
import productRoutes from "./products";
import addressRouter from "./addresses";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRoutes);
rootRouter.use("/products", productRoutes);
rootRouter.use("/addresses", addressRouter);

export default rootRouter;
