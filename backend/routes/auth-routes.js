import express from "express";
import { loginUser, logoutUser, registerUser, userCheck } from "../controller/auth-controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { decryptMiddleware } from "../middleware/decryptMiddleware.js";

const authRouter = express.Router();

authRouter.post("/signup",decryptMiddleware,registerUser);
authRouter.post("/login",decryptMiddleware,loginUser);
authRouter.get("/logout",logoutUser);
authRouter.get("/me",authMiddleware,userCheck);

export default authRouter;