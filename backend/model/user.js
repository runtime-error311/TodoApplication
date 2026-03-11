import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:100
    },
    email:{
        type:String,
        required:true,
        lower:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:8,
    }
});

const User = mongoose.model("User",userSchema);

export default User;