function AddEditTodo({
  mode,
  title,
  description,
  endDate,
  setTitle,
  setDescription,
  setEndDate,
  setIsModalOpen,
  handleSubmit
}) {

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[350px]">

        <h2 className="text-xl font-bold mb-4">
          {mode === "add" ? "Add Todo" : "Edit Todo"}
        </h2>

        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-2 mb-3 rounded"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

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
            {mode === "add" ? "Add" : "Save"}
          </button>

        </div>

      </div>

    </div>

  );

}

export default AddEditTodo;