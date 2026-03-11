import { useState } from "react";
import * as todoService from "../services/todoServices";

const today = new Date().toISOString().split("T")[0];

const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
export default function useTodos() {

  const [overdue, setOverdue] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const fetchTodos = async () => {

    try {

      const res = await todoService.getTodos();

      setOverdue(res.data.data.overdue);
      setTodayTodos(res.data.data.todayTodos);
      setUpcoming(res.data.data.upcoming);

    } catch (err) {

      console.log(err?.response?.data?.message);

    }

  };

  const addTodo = async (data) => {

    try {

      const res = await todoService.createTodo(data);
      const newTodo = res.data.data;

      if (data.endDate < today) {
        setOverdue(prev => [...prev, newTodo]);
      }
      else if (data.endDate > today) {
        setUpcoming(prev => [...prev, newTodo]);
      }
      else {
        setTodayTodos(prev => [...prev, newTodo]);
      }

    } catch (err) {

      console.log(err?.response?.data?.message);

    }

  };

  const removeTodo = async (id, endDate) => {

    try {

      await todoService.deleteTodo(id);

      if (endDate < today) {
        setOverdue(prev => prev.filter(t => t._id !== id));
      }
      else if (endDate > today) {
        setUpcoming(prev => prev.filter(t => t._id !== id));
      }
      else {
        setTodayTodos(prev => prev.filter(t => t._id !== id));
      }

    } catch (err) {

      console.log(err?.response?.data?.message);

    }

  };

  const toggleComplete = async (todo) => {

    try {

      const endDate = todo.endDate.split("T")[0];

      const res = await todoService.updateTodo(todo._id, {
        completed: !todo.completed
      });

      const updated = res.data.data;

      if (endDate < today) {
        setOverdue(prev =>
          prev.map(t => t._id === updated._id ? updated : t)
        );
      }
      else if (endDate > today) {
        setUpcoming(prev =>
          prev.map(t => t._id === updated._id ? updated : t)
        );
      }
      else {
        setTodayTodos(prev =>
          prev.map(t => t._id === updated._id ? updated : t)
        );
      }

    } catch (err) {

      console.log(err?.response?.data?.message);

    }

  };

  const editTodo = async (id, data) => {

    try {

      const res = await todoService.updateTodo(id, data);
      const updated = res.data.data;
        const updatedDate = updated.endDate.split("T")[0];

      // 1️⃣ remove from all arrays
      setOverdue((prev) => prev.filter((t) => t._id !== updated._id));
      setTodayTodos((prev) => prev.filter((t) => t._id !== updated._id));
      setUpcoming((prev) => prev.filter((t) => t._id !== updated._id));

      // 2️⃣ add to correct category
      if (updatedDate < today) {
        setOverdue((prev) => sortByDate([...prev, updated]));
      } else if (updatedDate > today) {
        setUpcoming((prev) => sortByDate([...prev, updated]));
      } else {
        setTodayTodos((prev) => sortByDate([...prev, updated]));
      }
    //   setOverdue(prev =>
    //     prev.map(t => t._id === updated._id ? updated : t)
    //   );

    //   setTodayTodos(prev =>
    //     prev.map(t => t._id === updated._id ? updated : t)
    //   );

    //   setUpcoming(prev =>
    //     prev.map(t => t._id === updated._id ? updated : t)
    //   );

    } catch (err) {

      console.log(err?.response?.data?.message);

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
    editTodo
  };

}