import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/database.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth-routes.js";
import todoRouter from "./routes/todo-routes.js";
import startAgendaJob from "./schedulers/agendaScheduler.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import { startCronJobs } from "./schedulers/cronScheduler.js";
import sessionMiddleware from "./config/session.js";
dotenv.config();
dbConnect();
const RUN_NODE_CRON = process.env.RUN_NODE_CRON;
const RUN_AGENDA = process.env.RUN_AGENDA;
console.log(RUN_AGENDA);
console.log(RUN_NODE_CRON);
if (RUN_NODE_CRON === "true")
    startCronJobs();
if (RUN_AGENDA === "true")
    startAgendaJob();
const PORT = Number(process.env.PORT) || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const app = express();
app.use(express.json());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(sessionMiddleware());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/todo", todoRouter);
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log("Server is now listening at ", PORT);
});
//# sourceMappingURL=index.js.map