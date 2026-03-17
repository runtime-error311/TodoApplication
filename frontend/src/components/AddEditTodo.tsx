import { useState } from "react";
import {mode} from "../constants/constant";
import {descriptionValidation,titleValidation} from "../utils/validation.js"
const { add } = mode;
type Props = {
  screen: string;
  title: string;
  description: string;
  endDate: string;

  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;

  handleSubmit: () => void;
};
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
}:Props) => {
  const [touched, setTouched] = useState({
    title: false,
    description: false,
  });

  const isValid = ()=>{
    if(titleValidation(touched,title) || descriptionValidation(touched,description)) return false;
    return true;
  }
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center" onClick={() => setIsModalOpen(false)}>
      <div className="bg-white p-6 rounded-xl w-87.5" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">
          {screen === add ? "Add Todo" : "Edit Todo"}
        </h2>
        <div className="mb-3">
          <input
            className="border w-full p-2  rounded"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onFocus={() => setTouched((prev)=>({ ...prev, title: false }))}
            onBlur={() => setTouched((prev)=>({ ...prev, title: true }))}
          />
          { titleValidation(touched,title)&& (
            <p className="text-red-500  mx-3 my-1 text-sm">
              Title must be in range of 3 to 100
            </p>
          )}
        </div>

        <div className="mb-3">
          <textarea
            className="border w-full p-2  rounded"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onFocus={() => setTouched((prev)=>({ ...prev, description: false }))}
            onBlur={() => setTouched((prev)=>({ ...prev, description: true }))}
          />
          {descriptionValidation(touched,description)&& (
            <p className="text-red-500  mx-3 my-1 text-sm">
              Description should be of atleast 3 characters
            </p>
          )}
        </div>
        <input
          type="date"
          className="border w-full p-2 mb-3 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            className="bg-gray-400 px-3 py-1 rounded cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>

          <button
            className="bg-purple-500 text-white px-3 py-1 rounded disabled:opacity-50 cursor-pointer"
            onClick={handleSubmit}
            disabled={!isValid()}
          >
            {screen === add ? "Add" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddEditTodo;
