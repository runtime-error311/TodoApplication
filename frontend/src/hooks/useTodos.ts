import { useContext, useState } from "react";
import * as todoService from "../services/todoServices";
import { sortByDate, splitString, today } from "../constants/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";
import { Todo } from "../types/todo.types";
import axios from "axios";

type TodoResponse = {
  overdue: Todo[];
  todayTodos: Todo[];
  upcoming: Todo[];
};

export default function useTodos() {
  const [overdue, setOverdue] = useState<Todo[]>([]);
  const [todayTodos, setTodayTodos] = useState<Todo[]>([]);
  const [upcoming, setUpcoming] = useState<Todo[]>([]);

  const context = useContext(UserContext);
  if (!context) throw new Error("UserContext not found!");

  const { setUser } = context;
  const navigate = useNavigate();

  const fetchTodos = async (): Promise<void> => {
    try {
      const res = await todoService.getTodos();

      const data = res.data.data as TodoResponse;

      setOverdue(data.overdue);
      setTodayTodos(data.todayTodos);
      setUpcoming(data.upcoming);
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          navigate("/login");
          setUser(null);
        }
        console.error(err.response?.data?.message);
      }
    }
  };

  const addTodo = async (data: todoService.CreateTodoPayload): Promise<boolean> => {
    try {
      const res = await todoService.createTodo(data);
      const newTodo = res.data.data.newTodo;

      if (data.endDate < today) {
        setOverdue(prev => sortByDate([...prev, newTodo]));
      } else if (data.endDate > today) {
        setUpcoming(prev => sortByDate([...prev, newTodo]));
      } else {
        setTodayTodos(prev => sortByDate([...prev, newTodo]));
      }

      toast.success(res.data.message);
      return true;
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          navigate("/login");
          setUser(null);
        }
        toast.error(err.response?.data?.message);
      }

      return false;
    }
  };

  const removeTodo = async (id: string, endDate: string): Promise<void> => {
    const formattedDate = endDate?.split(splitString)?.[0];

    try {
      const res = await todoService.deleteTodo(id);

      if (formattedDate < today) {
        setOverdue(prev => prev.filter(t => t._id !== id));
      } else if (formattedDate > today) {
        setUpcoming(prev => prev.filter(t => t._id !== id));
      } else {
        setTodayTodos(prev => prev.filter(t => t._id !== id));
      }

      toast.success(res.data.message);
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          navigate("/login");
          setUser(null);
        }
        toast.error(err.response?.data?.message);
      }
    }
  };


  const toggleComplete = async (todo: Todo): Promise<void> => {
    try {
      const endDate = todo?.endDate?.split(splitString)?.[0];

      const res = await todoService.updateTodo(todo._id, {
        ...todo,
        completed: !todo.completed,
      });

      const updated = res.data.data.updatedTodo;

      if (endDate < today) {
        setOverdue(prev =>
          prev.map(t => (t._id === updated._id ? updated : t))
        );
      } else if (endDate > today) {
        setUpcoming(prev =>
          prev.map(t => (t._id === updated._id ? updated : t))
        );
      } else {
        setTodayTodos(prev =>
          prev.map(t => (t._id === updated._id ? updated : t))
        );
      }
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          navigate("/login");
          setUser(null);
        }

        toast.error(err.response?.data?.message);
      }
    }
  };

  const updateTodo = async (id: string, data: todoService.UpdateTodoPayload): Promise<boolean> => {
    try {
      const res = await todoService.updateTodo(id, data);
      const updated = res.data.data.updatedTodo;

      const updatedDate = updated?.endDate?.split(splitString)?.[0];


      setOverdue(prev => prev.filter(t => t._id !== updated._id));
      setTodayTodos(prev => prev.filter(t => t._id !== updated._id));
      setUpcoming(prev => prev.filter(t => t._id !== updated._id));


      if (updatedDate < today) {
        setOverdue(prev => sortByDate([...prev, updated]));
      } else if (updatedDate > today) {
        setUpcoming(prev => sortByDate([...prev, updated]));
      } else {
        setTodayTodos(prev => sortByDate([...prev, updated]));
      }

      toast.success(res.data.message);
      return true;
    } catch (err: unknown) {
      console.error(err);

      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          navigate("/login");
          setUser(null);
        }
        toast.error(err.response?.data?.message);
      }

      return false;
    }
  };

  return {
    overdue,
    todayTodos,
    upcoming,
    fetchTodos,
    addTodo,
    removeTodo,
    toggleComplete,
    updateTodo,
  };
}