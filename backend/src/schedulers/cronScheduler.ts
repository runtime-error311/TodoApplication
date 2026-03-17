import cron from "node-cron";
import { deleteOldTodo } from "../jobs/deleteOldTodo.js";

export const startCronJobs = (): void => {
  cron.schedule(
    "0 * * * *",
    async () => {
      console.log("Running scheduled cleanup job");

      try {
        await deleteOldTodo();
      } catch (err) {
        console.error("Cron job failed:", err);
      }
    },
    {
      timezone: "Asia/Kolkata", 
    }
  );
};