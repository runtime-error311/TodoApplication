import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

import AddEditTodo from "../components/AddEditTodo";
import TodoList from "../components/TodoList";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const today = new Date().toISOString().split("T")[0];

function Dashboard() {
  const [overdue, setOverdue] = useState([]);
  const [todayTodos, setTodayTodos] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(today);

  const [editTodo, setEditTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await axios.get(VITE_API_URL + "todo", {
          withCredentials: true,
        });

        setOverdue(res?.data?.data?.overdue);
        setTodayTodos(res?.data?.data?.todayTodos);
        setUpcoming(res?.data?.data?.upcoming);
      } catch (err) {
        console.log(err?.response?.data?.message);
      }
    };

    getTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      const res = await axios.post(
        VITE_API_URL + "todo/create",
        { title, description, endDate },
        { withCredentials: true },
      );

      const newTodo = res.data.data;

      if (endDate < today) {
        setOverdue((prev) => [...prev, newTodo]);
      } else if (endDate > today) {
        setUpcoming((prev) => [...prev, newTodo]);
      } else {
        setTodayTodos((prev) => [...prev, newTodo]);
      }

      setTitle("");
      setDescription("");
      setEndDate(today);
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const handleDelete = async (id, endDate) => {
    endDate = endDate.split("T")[0];

    try {
      await axios.delete(VITE_API_URL + "todo/" + id, {
        withCredentials: true,
      });

      if (endDate < today) {
        setOverdue((prev) => prev.filter((t) => t._id !== id));
      } else if (endDate > today) {
        setUpcoming((prev) => prev.filter((t) => t._id !== id));
      } else {
        setTodayTodos((prev) => prev.filter((t) => t._id !== id));
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const toggleComplete = async (todo) => {
    const endDate = todo.endDate.split("T")[0];

    try {
      const res = await axios.patch(
        VITE_API_URL + "todo/" + todo._id,
        { completed: !todo.completed },
        { withCredentials: true },
      );

      const updated = res.data.data;

      if (endDate < today) {
        setOverdue((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t)),
        );
      } else if (endDate > today) {
        setUpcoming((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t)),
        );
      } else {
        setTodayTodos((prev) =>
          prev.map((t) => (t._id === updated._id ? updated : t)),
        );
      }
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  const openAddModal = () => {
    setMode("add");
    setTitle("");
    setDescription("");
    setEndDate(today);
    setIsModalOpen(true);
  };

  const openEdit = (todo) => {
    setMode("edit");
    setEditTodo(todo);

    setTitle(todo.title);
    setDescription(todo.description);
    setEndDate(todo.endDate.split("T")[0]);

    setIsModalOpen(true);
  };

  const saveEdit = async () => {
    try {
      const res = await axios.patch(
        VITE_API_URL + "todo/" + editTodo._id,
        { title, description, endDate },
        { withCredentials: true },
      );

      const updated = res.data.data;

      setOverdue((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t)),
      );
      setTodayTodos((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t)),
      );
      setUpcoming((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t)),
      );
    } catch (err) {
      console.log(err?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-4">
      <div className="w-full max-w-3xl md:h-[80vh] rounded-xl shadow-xl bg-linear-to-r from-purple-100 to-purple-300">
        <Navbar />

        <div className="relative p-4">
          <button
            className="fixed md:absolute bottom-6 right-6 md:top-[60vh] md:right-10 w-14 h-14 rounded-full bg-red-400 hover:bg-red-600 text-white text-3xl flex items-center justify-center shadow-lg"
            onClick={openAddModal}
          >
            +
          </button>

          {overdue.length===0 && todayTodos.length===0 && upcoming.length===0?<p className=" text-center ">No Todo Found! Please make some Todos.</p>:[...overdue, ...todayTodos, ...upcoming].map((todo) => (
            <TodoList handleDelete={handleDelete} openEdit={openEdit} today={today} todo={todo} toggleComplete={toggleComplete} key={todo._id}/>
        
          ))}
        </div>
      </div>

      {isModalOpen && (
        <AddEditTodo
          mode={mode}
          description={description}
          endDate={endDate}
          handleAddTodo={handleAddTodo}
          saveEdit={saveEdit}
          setDescription={setDescription}
          setEndDate={setEndDate}
          setIsModalOpen={setIsModalOpen}
          setTitle={setTitle}
          title={title}
        />
      )}
    </div>
  );
}

export default Dashboard;
