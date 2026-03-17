import agenda from "../config/agenda.js";
import { deleteOldTodo } from "../jobs/deleteOldTodo.js";
agenda.define("delete old todos", async (job) => {
    try {
        await deleteOldTodo();
    }
    catch (err) {
        console.error("Agenda job failed:", err);
    }
});
const startAgendaJob = async () => {
    try {
        await agenda.start();
        console.log("Agenda job scheduler started!");
        await agenda.every("0 * * * *", "delete old todos");
    }
    catch (err) {
        console.error("Error starting agenda:", err);
    }
};
export default startAgendaJob;
//# sourceMappingURL=agendaScheduler.js.map