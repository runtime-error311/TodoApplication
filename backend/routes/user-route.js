import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { userCheck } from "../controller/auth-controller.js";


const userRouter = express.Router();
userRouter.get("/me",authMiddleware,userCheck);

export default userRouter;