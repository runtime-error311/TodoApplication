import express from "express";
import authMiddleware, { sessionAuthMiddleware } from "../middleware/authMiddleware.js";
import { allUserTodos, createTodo, deleteTodo, singleTodo, updateTodo } from "../controller/todo-controller.js";
import { decryptMiddleware } from "../middleware/decryptMiddleware.js";
const todoRouter = express.Router();

todoRouter.post('/create',authMiddleware,decryptMiddleware,createTodo);
todoRouter.get('/:id',authMiddleware,singleTodo);
todoRouter.get('/',authMiddleware,allUserTodos);
todoRouter.patch('/:id',authMiddleware,decryptMiddleware,updateTodo);
todoRouter.delete('/:id',authMiddleware,deleteTodo);

// todoRouter.post('/create',sessionAuthMiddleware,createTodo);
// todoRouter.get('/:id',sessionAuthMiddleware,singleTodo);
// todoRouter.get('/',sessionAuthMiddleware,allUserTodos);
// todoRouter.patch('/:id',sessionAuthMiddleware,updateTodo);
// todoRouter.delete('/:id',sessionAuthMiddleware,deleteTodo);

export default todoRouter;