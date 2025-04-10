import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import TodoApp from "./pages/todoApps";
import Home from "./pages/home";

export default function App() {
  return (
    <Router>
      <nav className="bg-blue-500 p-4 text-white flex justify-center gap-4">
        <Link to="/">Home</Link>
        <Link to="/todos">To-Do</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoApp />} />
      </Routes>
    </Router>
  );
}
