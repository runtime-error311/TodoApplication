import { useState } from "react";
import { mode } from "../constants/constant";
const { add } = mode;
const AddEditTodo = ({
  screen,
  title,
  description,
  endDate,
  setTitle,
  setDescription,
  setEndDate,
  setIsModalOpen,
  handleSubmit,
}) => {
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-[350px]">
        <h2 className="text-xl font-bold mb-4">
          {screen === add ? "Add Todo" : "Edit Todo"}
        </h2>
        <div className="mb-3">
          <input
            className="border w-full p-2  rounded"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setTouched({ ...touched, title: false })}
            onBlur={() => setTouched({ ...touched, title: true })}
          />
          {touched.title && (title.length < 3 || title.length > 100) ? (
            <p className="text-red-500  mx-3 my-1 text-sm">
              Title must be in range of 3 to 100
            </p>
          ) : null}
        </div>

        <div className="mb-3">
          <textarea
            className="border w-full p-2  rounded"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setTouched({ ...touched, description: false })}
            onBlur={() => setTouched({ ...touched, description: true })}
          />
          {touched.description && description.length < 3 ? (
            <p className="text-red-500  mx-3 my-1 text-sm">
              Description should be of atleast 3 characters
            </p>
          ) : null}
        </div>
        <input
          type="date"
          className="border w-full p-2 mb-3 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-400 px-3 py-1 rounded"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="bg-purple-500 text-white px-3 py-1 rounded"
            onClick={handleSubmit}
          >
            {screen === add ? "Add" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTodo;
