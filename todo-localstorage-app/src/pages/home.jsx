import React from "react";
import { Link } from "react-router-dom"; // Pastikan Link sudah diimport

export default function Home() {
  return (
    <div className="bg-blue-200 text-black text-center min-h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-6">
        Hello, welcome to the To-Do App!
      </h1>
      <div className="transition transform hover:scale-105 active:scale-95">
        <Link
          to="/todos"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg shadow-md"
        >
          Go to Todos
        </Link>
      </div>
    </div>
  );
}
