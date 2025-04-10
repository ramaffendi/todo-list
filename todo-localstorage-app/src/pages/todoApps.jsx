import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_API}/todos`);
      setTodos(res.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    try {
      if (isEditing) {
        await axios.put(`${import.meta.env.VITE_REACT_API}/todos/${editId}`, {
          text: task,
        });
        setIsEditing(false);
        setEditId(null);
      } else {
        await axios.post(`${import.meta.env.VITE_REACT_API}/todos`, {
          text: task,
        });
      }
      setTask("");
      fetchTodos();
    } catch (error) {
      console.error("Failed to submit todo:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const todo = todos.find((t) => t.id === id);
      await axios.put(`${import.meta.env.VITE_REACT_API}/todos/${id}`, {
        completed: !todo.completed,
      });
      fetchTodos();
    } catch (error) {
      console.error("Failed to toggle complete:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_REACT_API}/todos/${id}`);
      fetchTodos();
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const editTodo = (id) => {
    const currentTodo = todos.find((todo) => todo.id === id);
    setTask(currentTodo.text);
    setIsEditing(true);
    setEditId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
        To-Do List
      </h1>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mb-6 w-full max-w-md"
      >
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="px-4 py-2 border rounded-lg w-full text-base"
          placeholder="Tambah tugas..."
        />
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto 
            transition-transform duration-200 hover:scale-105 hover:bg-blue-600
            ${!isEditing && "animate-bounce sm:animate-none"}`}
        >
          {isEditing ? "Update" : "Tambah"}
        </button>
      </form>

      {/* Daftar To-Do */}
      <ul className="w-full max-w-md">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center 
            bg-white p-3 rounded shadow mb-2 gap-2
            hover:bg-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            {/* Kiri: Checkbox & Teks */}
            <div className="flex items-start sm:items-center gap-2 w-full">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mt-1 sm:mt-0"
              />
              <span
                className={`break-words ${
                  todo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {todo.text}
              </span>
            </div>

            {/* Kanan: Tombol edit & hapus */}
            <div className="flex gap-3 self-end sm:self-auto text-lg">
              <button
                onClick={() => editTodo(todo.id)}
                className="text-blue-500 hover:scale-110 transition-transform duration-200"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:scale-110 transition-transform duration-200"
              >
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
