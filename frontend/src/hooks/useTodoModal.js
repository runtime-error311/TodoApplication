import { useState } from "react";

const today = new Date().toISOString().split("T")[0];

export default function useTodoModal() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(today);

  const [editTodo, setEditTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");

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

  return {
    title,
    description,
    endDate,
    setTitle,
    setDescription,
    setEndDate,
    editTodo,
    isModalOpen,
    setIsModalOpen,
    mode,
    openAddModal,
    openEdit
  };

}