import { useState } from "react";
import { emptyString, mode, splitString, today } from "../constants/constant";
import { Todo } from "../types/todo.types";

const { add, edit } = mode

export default function useTodoModal() {
  const [title, setTitle] = useState<string>(emptyString);
  const [description, setDescription] = useState<string>(emptyString);
  const [endDate, setEndDate] = useState<string>(today);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [screen, setScreen] = useState<string>(add);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const resetForm = (): void => {
    setTitle(emptyString);
    setDescription(emptyString);
    setEndDate(today);
    setEditingTodo(null);
  };

  const openAddModal = (): void => {
    setScreen(add);
    resetForm();
    setIsModalOpen(true);
  };

  const openEdit = (todo: Todo): void => {
    setScreen(edit);
    setEditingTodo({ ...todo });

    setTitle(todo.title);
    setDescription(todo.description);
    setEndDate(todo?.endDate?.split(splitString)?.[0] || today);

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