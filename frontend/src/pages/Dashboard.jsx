import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AddEditTodo from "../components/AddEditTodo";
import TodoList from "../components/TodoList";

import useTodos from "../hooks/useTodos";
import useTodoModal from "../hooks/useTodoModal";

import { mode, today } from "../constants/constant";

const {add} = mode;
function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    overdue,
    todayTodos,
    upcoming,
    fetchTodos,
    addTodo,
    removeTodo,
    toggleComplete,
    updateTodo
  } = useTodos({isModalOpen, setIsModalOpen});

  const {
    title,
    description,
    endDate,
    setTitle,
    setDescription,
    setEndDate,
    editingTodo,
    screen,
    openAddModal,
    openEdit
  } = useTodoModal({isModalOpen, setIsModalOpen});

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleSubmit = async() => {
    let success;
    if (screen === add) {

      success =await addTodo({
        title,
        description,
        endDate
      });
      
    } else {
      
      success= await updateTodo(editingTodo._id, {
        title,
        description,
        endDate
      });
      
    }
    if(success) setIsModalOpen(false);

  };

  const todos = [...overdue, ...todayTodos, ...upcoming];

  return (
    <div className=" min-h-screen flex justify-center items-start md:items-center p-4 ">

      <div className="relative w-full max-w-3xl md:h-[80vh] rounded-xl shadow-xl bg-linear-to-r from-purple-100 to-purple-300 overflow-y-auto ">

        <Navbar />

        <div className="p-4 pb-20">
          {todos.length === 0 ? (

            <p className="text-center">
              No Todo Found! Please try to add some todos.
            </p>

          ) : (

            todos.map((todo) => (

              <TodoList
                key={todo._id}
                todo={todo}
                today={today}
                toggleComplete={toggleComplete}
                handleDelete={removeTodo}
                openEdit={openEdit}
              />

            ))

          )}

          <button
            className= "absolute bottom-6 right-6 w-14 h-14 rounded-full bg-red-400 text-white flex items-center justify-center shadow-lg"
            onClick={openAddModal}
          >
            +
          </button>
        </div>

      </div>

      {isModalOpen && (

        <AddEditTodo
          screen={screen}
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
