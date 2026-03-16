import { MongoBackend } from "@agendajs/mongo-backend";
import { Agenda } from "agenda";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if(!MONGO_URI){
    throw new Error("MongoDb URL in not present ")
}
const agenda = new Agenda({
    backend: new MongoBackend({ address: MONGO_URI })
});

export default agenda;