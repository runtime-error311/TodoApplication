import agenda from '../config/agenda.js';
import { deleteOldTodo } from '../jobs/deleteOldTodo.js';


agenda.define('delete old todos', async job => {
    await deleteOldTodo();
});

const startAgendaJob = async ()=>{
	await agenda.start();
    console.log("Agenda job scheduler started!");

	await agenda.every('* * * * * *', 'delete old todos');

};
export default startAgendaJob;