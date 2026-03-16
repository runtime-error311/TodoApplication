import { useContext, useState } from "react";
import * as todoService from "../services/todoServices";
import { sortByDate, splitString, today } from "../constants/constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/userContext";



export default function useTodos() {

  const [overdue, setOverdue] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const {setUser} = useContext(UserContext);
  const navigate = useNavigate();

  const fetchTodos = async () => {

    try {

      const res = await todoService.getTodos();

      setOverdue(res?.data?.data?.overdue);
      setTodayTodos(res?.data?.data?.todayTodos);
      setUpcoming(res?.data?.data?.upcoming);

    } catch (err) {

      console.error(err?.response?.data?.message);

    }

  };

  const addTodo = async (data) => {

    try {

      const res = await todoService.createTodo(data);
      const newTodo = res?.data?.data;

      if (data.endDate < today) {
        setOverdue(prev => sortByDate([...prev, newTodo]));
      }
      else if (data.endDate > today) {
        setUpcoming(prev => sortByDate([...prev, newTodo]));
      }
      else {
        setTodayTodos(prev => sortByDate([...prev, newTodo]));
      }

      toast.success(res?.data?.message);
      return true;
    } catch (err) {
        
        console.error(err?.response?.data?.message);
        toast.error(err?.response?.data?.message);
        return false;

    }

  };

  const removeTodo = async (id, endDate) => {
    endDate =endDate?.split(splitString)?.[0];
    try {
      const res = await todoService.deleteTodo(id);

      if (endDate < today) {
        setOverdue(prev => prev.filter(t => t._id !== id));
      }
      else if (endDate > today) {
        setUpcoming(prev => prev.filter(t => t._id !== id));
      }
      else {
        setTodayTodos(prev => prev.filter(t => t._id !== id));
      }
      toast.success(res?.data?.message);

    } catch (err) {

      console.log(err?.response?.data?.message);
      toast.error(err?.response?.data?.message);

    }

  };

  const toggleComplete = async (todo) => {

    try {

      const endDate = todo?.endDate?.split(splitString)?.[0];

      const res = await todoService.updateTodo(todo._id, {
        completed: !todo.completed
      });

      const updated = res?.data?.data;

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
      if(err?.response?.status===401){
        navigate("/login");
        setUser(null);
        toast.error(err?.response?.data?.message);
      }
      

    }

  };

  const updateTodo = async (id, data) => {

    try {

      const res = await todoService.updateTodo(id, data);
      const updated = res.data.data;

      const updatedDate = updated?.endDate?.split(splitString)?.[0];

      setOverdue(prev => prev.filter(t => t._id !== updated._id));
      setTodayTodos(prev => prev.filter(t => t._id !== updated._id));
      setUpcoming(prev => prev.filter(t => t._id !== updated._id));

      if (updatedDate < today) {
        setOverdue(prev => sortByDate([...prev, updated]));
      }
      else if (updatedDate > today) {
        setUpcoming(prev => sortByDate([...prev, updated]));
      }
      else {
        setTodayTodos(prev => sortByDate([...prev, updated]));
      }

      toast.success(res.data.message);
      return true;
      
    } catch (err) {
        
        console.log(err?.response?.data?.message);
        
        toast.error(err?.response?.data?.message);
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
    updateTodo
  };

}