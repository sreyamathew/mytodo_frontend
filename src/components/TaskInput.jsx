import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ addTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="flex mb-4">
      <input
        type="text"
        className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600"
        onClick={handleAdd}
      >
        <FaPlus />
      </button>
    </div>
  );
}
