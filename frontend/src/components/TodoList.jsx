import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { splitString } from "../constants/constant";
import React from "react";

function TodoList({ todo, today, toggleComplete, openEdit, handleDelete }) {
  const endDate = todo?.endDate?.split(splitString)[0];
  return (
    <div
      className="bg-purple-100 grid grid-cols-[200px_1fr_auto] items-center gap-2 border-2 rounded-xl m-2 p-3"
    >
      <div className="flex items-center gap-2">
        <div>
          <h3
            className={`text-sm font-semibold ${endDate < today ? "text-red-500" : ""}`}
          >
            {endDate < today
              ? "Overdue"
              : endDate === today
                ? "Today"
                : endDate}
          </h3>
          <div className=" flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              id={todo._id}
            />
            <label htmlFor={todo._id}
              className={`font-bold truncate max-w-[100px] md:max-w-[150px] ${
                todo.completed ? "line-through opacity-60" : ""
              }`}
            >
              {todo.title}
            </label>
          </div>
        </div>
      </div>
      <p
        className={`text-sm line-clamp-2 md:max-w-[300px] ${
          todo.completed ? "line-through opacity-60" : ""
        }`}
      >
        {todo.description}
      </p>

      <div className="flex gap-3 justify-end">
        <button onClick={() => openEdit(todo)}  >
          <MdEdit  size={20} className="cursor-pointer"/>

        </button>
        <button onClick={() => handleDelete(todo._id, todo.endDate)} >
          <RiDeleteBin6Fill  size={20} className="cursor-pointer" />

        </button>
      </div>
    </div>
  );
}

export default React.memo(TodoList);
