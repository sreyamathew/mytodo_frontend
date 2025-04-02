import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:3000/tasks");
        if (!res.ok) throw new Error("Failed to fetch tasks");
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // ✅ Add task
  const addTask = async (text) => {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTask = await res.json();
    setTasks([...tasks, newTask]); // Append the new task
  };

  // ✅ Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }), // Toggle completed
      });
  
      if (!res.ok) throw new Error("Failed to update task");
  
      const updatedTask = await res.json();
  
      // Update state correctly
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  // ✅ Edit task
  const editTask = async (id, text) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const updatedTask = await res.json();
    setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)));
  };

  // ✅ Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task._id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">Todo List</h1>
        <TaskInput addTask={addTask} />
        <TaskList tasks={tasks} toggleTask={toggleTask} editTask={editTask} deleteTask={deleteTask} />
      </div>
    </div>
  );
}
