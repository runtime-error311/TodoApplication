import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        min:3,
        max:100
    },
    description:{
        type:String,
        default:"Description of this Todo is",
        min:3
    },
    completed:{
        type:Boolean,
        default:false
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    endDate:{
        type:Date,
        required:true
    }
});

const Todo = mongoose.model("Todo",todoSchema);

export default Todo;