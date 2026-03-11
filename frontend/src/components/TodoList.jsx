import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

function TodoList({ todo, today, toggleComplete, openEdit, handleDelete }) {
  return (
    <div
      key={todo._id}
      className="bg-purple-100 flex flex-col md:flex-row md:items-center md:justify-between gap-2 border-2 rounded-xl m-2 p-3"
    >
      <div className="flex items-center gap-2">
        <div>
          <h3
            className={`text-sm font-semibold ${todo.endDate.split("T")[0] < today ? "text-red-500" : ""}`}
          >
            {todo.endDate.split("T")[0] < today
              ? "Overdue"
              : todo.endDate.split("T")[0] === today
                ? "Today"
                : todo.endDate.split("T")[0]}
          </h3>
          <div className=" flex justify-center items-center gap-2">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo)}
            />

            <p className="font-bold truncate max-w-[150px] md:max-w-[250px] ">
              {todo.title}
            </p>
          </div>
        </div>
      </div>

      <p className="text-sm line-clamp-2 md:max-w-[300px]">
        {todo.description}
      </p>

      <div className="flex gap-3 justify-end">
        <button onClick={() => openEdit(todo)}>
          <MdEdit size={20} />
        </button>

        <button onClick={() => handleDelete(todo._id, todo.endDate)}>
          <RiDeleteBin6Fill size={20} />
        </button>
      </div>
    </div>
  );
}

export default TodoList;
