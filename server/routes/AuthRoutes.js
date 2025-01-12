import { Router } from "express";
import { login, signup, getUserInfo } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const authRoutes = Router()

authRoutes.post("/signup", signup);
authRoutes.post("/login", login)
authRoutes.get("/user-info",verifyToken, getUserInfo);

export default authRoutes;