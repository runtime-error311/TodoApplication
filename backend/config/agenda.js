import { MongoBackend } from "@agendajs/mongo-backend";
import { Agenda } from "agenda";

const mongoConnectionString = process.env.MONGO_URI;
if(!mongoConnectionString){
    throw new Error("MongoDb URL in not present ")
}
const agenda = new Agenda({
    backend: new MongoBackend({ address: mongoConnectionString })
});

export default agenda;