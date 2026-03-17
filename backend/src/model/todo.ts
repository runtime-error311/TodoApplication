import mongoose, { Document, Schema, Types } from "mongoose";


export interface ITodo extends Document {
  title: string;
  description: string;
  completed: boolean;
  user: Types.ObjectId;
  endDate: Date;
}


const todoSchema: Schema<ITodo> = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      default: "Description of this Todo is",
      minlength: 3,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;