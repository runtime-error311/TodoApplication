import cron from "node-cron";
import { deleteOldTodo } from "../jobs/deleteOldTodo.js";

export const startCronJobs = () => {

  cron.schedule("* * * * * *", async () => {

    console.log("Running scheduled cleanup job");

    await deleteOldTodo();

  },{});

};