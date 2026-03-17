import mongoose, { Schema } from "mongoose";
const todoSchema = new Schema({
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
}, {
    timestamps: true,
});
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
//# sourceMappingURL=todo.js.map