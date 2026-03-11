import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes.js";
import todoRouter from "./routes/todo-routes.js";
import userRouter from "./routes/user-route.js";
dotenv.config();

dbConnect();
const PORT = process.env.PORT || 5000;
const CLIENT_URL=process.env.CLIENT_URL || "http://localhost:5173";
const app = express();

app.use(express.json());
app.use(cors({
    origin:CLIENT_URL,
    credentials:true
}));
app.use(cookieParser());

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/todo",todoRouter);
app.use("/api/v1",userRouter);

app.listen(PORT,()=>{
    console.log("Server is now listening at ",PORT);
})
