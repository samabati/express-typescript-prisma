import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  addAddress,
  deleteAddress,
  listAddress,
} from "../controllers/addresses";

const addressRouter = Router();

addressRouter.post("/", [authMiddleware], errorHandler(addAddress));
addressRouter.delete("/:id", [authMiddleware], errorHandler(deleteAddress));
addressRouter.get("/", [authMiddleware], errorHandler(listAddress));

export default addressRouter;
