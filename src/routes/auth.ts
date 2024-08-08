import { Router } from "express";
import { login, signup, me } from "../controllers/auth";
import { errorHandler } from "../errorhandler";
import { authMiddleware } from "../middlewares/authMiddleware";

const authRoutes: Router = Router();

authRoutes.post("/signup", errorHandler(signup));
authRoutes.post("/login", errorHandler(login));
authRoutes.get("/me", [authMiddleware], errorHandler(me));

export default authRoutes;
