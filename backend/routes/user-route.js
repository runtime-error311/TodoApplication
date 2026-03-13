import express from "express";
import authMiddleware, { sessionAuthMiddleware } from "../middleware/authMiddleware.js";
import { userCheck } from "../controller/auth-controller.js";


const userRouter = express.Router();
userRouter.get("/me",authMiddleware,userCheck);
// userRouter.get("/me",sessionAuthMiddleware,userCheck);

export default userRouter;