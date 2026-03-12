import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { splitString } from "../constants/constant";

function TodoList({ todo, today, toggleComplete, openEdit, handleDelete }) {
  return (
    <div
      key={todo._id}
      className="bg-purple-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-2 rounded-xl m-2 p-3"
    >
      <div className="flex items-center gap-2">
        <div>
          <h3
            className={`text-sm font-semibold ${todo.endDate.split(splitString)[0] < today ? "text-red-500" : ""}`}
          >
            {todo.endDate.split(splitString)[0] < today
              ? "Overdue"
              : todo.endDate.split(splitString)[0] === today
                ? "Today"
                : todo.endDate.split(splitString)[0]}
          </h3>
          <div className=" flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
              id={todo._id}
            />
            <label htmlFor={todo._id}
              className={`font-bold truncate max-w-[100px] md:max-w-[100px] ${
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
          <MdEdit onClick={() => openEdit(todo)} size={20} className="cursor-pointer" />
          <RiDeleteBin6Fill onClick={() => handleDelete(todo._id, todo.endDate)} size={20} className="cursor-pointer" />
      </div>
    </div>
  );
}

export default TodoList;
