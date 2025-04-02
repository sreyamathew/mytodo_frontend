import { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (index, text) => {
    setEditingIndex(index);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTask(id, editText);
    setEditingIndex(null);
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li
          key={task._id}
          className={`flex justify-between items-center p-3 border-b border-gray-200 ${
            task.completed ? "line-through text-gray-500" : ""
          }`}
        >
          <button
            className="text-green-500 hover:text-green-700"
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle /> : <FaRegCircle />}
          </button>
          {editingIndex === task._id ? (
            <input
              type="text"
              className="flex-1 p-1 border border-gray-300 rounded"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            />
          ) : (
            <span
              onClick={() => toggleTask(task._id, task.completed)}
              className="cursor-pointer flex-1 mx-2"
            >
              {task.text}
            </span>
          )}
          <div className="flex gap-2">
            {editingIndex === task._id ? (
              <button
                className="text-green-500 hover:text-green-700"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle />
              </button>
            ) : (
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit />
              </button>
            )}
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
