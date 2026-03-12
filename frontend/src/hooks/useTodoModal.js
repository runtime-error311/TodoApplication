import { useState } from "react";
import { emptyString, mode, splitString, today } from "../constants/constant";

const { add, edit } = mode;
export default function useTodoModal({ isModalOpen, setIsModalOpen }) {
  const [title, setTitle] = useState(emptyString);
  const [description, setDescription] = useState(emptyString);
  const [endDate, setEndDate] = useState(today);

  const [editingTodo, setEditingTodo] = useState(null);

  const [screen, setScreen] = useState(add);

  const openAddModal = () => {
    setScreen(add);
    setTitle(emptyString);
    setDescription(emptyString);
    setEndDate(today);
    setEditingTodo(null);

    setIsModalOpen(true);
  };

  const openEdit = (todo) => {
    setScreen(edit);
    setEditingTodo(todo);

    setTitle(todo.title);
    setDescription(todo.description);
    setEndDate(todo.endDate.split(splitString)[0]);

    setIsModalOpen(true);
  };

  return {
    title,
    description,
    endDate,
    setTitle,
    setDescription,
    setEndDate,
    editingTodo,
    isModalOpen,
    setIsModalOpen,
    screen,
    openAddModal,
    openEdit,
  };
}
