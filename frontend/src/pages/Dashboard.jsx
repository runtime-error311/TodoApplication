import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddEditTodo from "../components/AddEditTodo";
import TodoList from "../components/TodoList";
import useTodos from "../hooks/useTodos";

const today = new Date().toISOString().split("T")[0];

function Dashboard() {

  const {
    overdue,
    todayTodos,
    upcoming,
    fetchTodos,
    addTodo,
    removeTodo,
    toggleComplete,
    editTodo
  } = useTodos();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(today);

  const [editItem, setEditItem] = useState(null);
  const [mode, setMode] = useState("add");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const openAddModal = () => {

    setMode("add");
    setTitle("");
    setDescription("");
    setEndDate(today);
    setIsModalOpen(true);

  };

  const openEdit = (todo) => {

    setMode("edit");
    setEditItem(todo);

    setTitle(todo.title);
    setDescription(todo.description);
    setEndDate(todo.endDate.split("T")[0]);

    setIsModalOpen(true);

  };

  const handleSubmit = () => {

    if (mode === "add") {

      addTodo({ title, description, endDate });

    } else {

      editTodo(editItem._id, { title, description, endDate });

    }

    setIsModalOpen(false);

  };

  const todos = [...overdue, ...todayTodos, ...upcoming];

  return (

    <div className="min-h-screen flex justify-center items-start md:items-center p-4">

      <div className="w-full max-w-3xl md:h-[80vh] rounded-xl shadow-xl bg-linear-to-r from-purple-100 to-purple-300">

        <Navbar />

        <div className="relative p-4">

          <button
            className="fixed md:absolute bottom-6 right-6 md:top-[60vh] md:right-10 w-14 h-14 rounded-full bg-red-400 text-white text-3xl flex items-center justify-center shadow-lg"
            onClick={openAddModal}
          >
            +
          </button>

          {todos.length === 0
            ? <p className="text-center">No Todo Found! Please try to add some todos.</p>
            : todos.map(todo => (

                <TodoList
                  key={todo._id}
                  todo={todo}
                  today={today}
                  toggleComplete={toggleComplete}
                  handleDelete={removeTodo}
                  openEdit={openEdit}
                />

              ))
          }

        </div>

      </div>

      {isModalOpen && (

        <AddEditTodo
          mode={mode}
          title={title}
          description={description}
          endDate={endDate}
          setTitle={setTitle}
          setDescription={setDescription}
          setEndDate={setEndDate}
          setIsModalOpen={setIsModalOpen}
          handleSubmit={handleSubmit}
        />

      )}

    </div>

  );

}

export default Dashboard;
