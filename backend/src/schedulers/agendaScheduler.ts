import agenda from "../config/agenda.js";
import { deleteOldTodo } from "../jobs/deleteOldTodo.js";
import { Job } from "agenda";

agenda.define("delete old todos", async (job: Job): Promise<void> => {
  try {
    await deleteOldTodo();
  } catch (err) {
    console.error("Agenda job failed:", err);
  }
});

const startAgendaJob = async (): Promise<void> => {
  try {
    await agenda.start();
    console.log("Agenda job scheduler started!");

    // Runs every hour
    await agenda.every("0 * * * *", "delete old todos");
  } catch (err) {
    console.error("Error starting agenda:", err);
  }
};

export default startAgendaJob;