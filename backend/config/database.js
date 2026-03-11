import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const dbConnect = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log("Database Connected Successfully!"); 
    }
    catch(err){
        console.log("Database Connection Failed!",err);
        process.exit(1);
    }
}

export default dbConnect;