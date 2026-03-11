import express from "express";
import { loginUser, logoutUser, registerUser } from "../controller/auth-controller.js";

const authRouter = express.Router();

authRouter.post("/signup",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/logout",logoutUser);

export default authRouter;