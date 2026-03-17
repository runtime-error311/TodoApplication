import { validationTodo } from "../config/validation.js";
import Todo from "../model/todo.js";
import { errResponse, successResponse } from "../utils/apiResponse.js";
export const createTodo = async (req, res) => {
    try {
        const { title, description, completed, endDate } = req.body;
        const { userId } = req;
        if (!title || !description) {
            return errResponse(res, 400, "All inputs are required!");
        }
        const notValid = validationTodo(req.body);
        if (notValid) {
            return errResponse(res, 400, notValid);
        }
        const newTodo = await Todo.create({
            title, description, completed: completed ? completed : false, user: userId, endDate
        });
        return successResponse(res, 201, { newTodo }, "Todo Created successfully");
    }
    catch (err) {
        if (err instanceof Error)
            return errResponse(res, 500, "Create Todo err is " + err.message);
        return errResponse(res, 500, "Unknown Create Todo err ");
    }
};
export const singleTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findById(id);
        if (!todo) {
            return res.status(404).json({
                message: "No todo found!"
            });
        }
        return successResponse(res, 200, { todo }, "Todo found successfully");
    }
    catch (err) {
        if (err instanceof Error)
            return errResponse(res, 500, "Get Single Todo err is " + err.message);
        return errResponse(res, 500, "Unknown Get Single Todo err ");
    }
};
export const allUserTodos = async (req, res) => {
    try {
        const { userId } = req;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setDate(today.getDate() - 1);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const overdue = await Todo.find({ endDate: { $lt: today }, user: userId }).sort({ endDate: 1 });
        const todayTodos = await Todo.find({ endDate: { $gte: today, $lt: tomorrow }, user: userId }).sort({ endDate: 1 });
        const upcoming = await Todo.find({ endDate: { $gte: tomorrow }, user: userId }).sort({ endDate: 1 });
        return successResponse(res, 200, { overdue, todayTodos, upcoming }, "Todo found successfully");
    }
    catch (err) {
        if (err instanceof Error)
            return errResponse(res, 500, "Get all user's todos err is " + err.message);
        return errResponse(res, 500, "Unknown Get all user's todos err ");
    }
};
export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req;
        const notValid = validationTodo(req.body);
        if (notValid) {
            return errResponse(res, 400, notValid);
        }
        const updatedTodo = await Todo.findOneAndUpdate({ _id: id, user: userId }, { $set: req.body }, { new: true });
        if (!updatedTodo) {
            return errResponse(res, 404, "Todo not found! ");
        }
        return successResponse(res, 200, { updatedTodo }, "Todo updated successfully");
    }
    catch (err) {
        if (err instanceof Error)
            return errResponse(res, 500, "Update Todo err is " + err.message);
        return errResponse(res, 500, "Unknown Update Todo err");
    }
};
export const deleteTodo = async (req, res) => {
    try {
        const { userId } = req;
        const { id } = req.params;
        await Todo.findOneAndDelete({ _id: id, user: userId });
        if (!deleteTodo) {
            return errResponse(res, 404, "No todo found!");
        }
        return successResponse(res, 200, null, "Todo deleted successfully!");
    }
    catch (err) {
        if (err instanceof Error)
            return errResponse(res, 500, "Delete Todo err is " + err.message);
        return errResponse(res, 500, "Unknown Delete Todo err ");
    }
};
//# sourceMappingURL=todo-controller.js.map