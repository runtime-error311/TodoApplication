import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { allUserTodos, createTodo, deleteTodo, singleTodo, updateTodo } from "../controller/todo-controller.js";
import { decryptMiddleware } from "../middleware/decryptMiddleware.js";
const todoRouter = express.Router();
todoRouter.post('/create', authMiddleware, decryptMiddleware, createTodo);
todoRouter.get('/:id', authMiddleware, singleTodo);
todoRouter.get('/', authMiddleware, allUserTodos);
todoRouter.patch('/:id', authMiddleware, decryptMiddleware, updateTodo);
todoRouter.delete('/:id', authMiddleware, deleteTodo);
export default todoRouter;
//# sourceMappingURL=todo-routes.js.map