// src/pages/MyAcceptedTasks.jsx
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [acceptedTasks, setAcceptedTasks] = useState([]);

  // Load accepted tasks from localStorage
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("acceptedTasks")) || [];
    // Filter tasks for current user email
    const userTasks = tasks.filter((task) => task.userEmail !== user.email);
    setAcceptedTasks(userTasks);
  }, [user.email]);

  // Handle Done or Cancel
  const handleRemove = (id, action) => {
    const updatedTasks = acceptedTasks.filter((task) => task._id !== id);
    setAcceptedTasks(updatedTasks);

    // Update localStorage
    const allTasks = JSON.parse(localStorage.getItem("acceptedTasks")) || [];
    const remainingTasks = allTasks.filter((task) => task._id !== id);
    localStorage.setItem("acceptedTasks", JSON.stringify(remainingTasks));

    toast.success(`Task ${action === "done" ? "completed" : "canceled"}!`);
  };

  if (!user) {
    return (
      <p className="text-center mt-12 text-red-500 font-semibold">
        Please login to see your accepted tasks.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Accepted Tasks
      </h1>

      {acceptedTasks.length === 0 ? (
        <p className="text-gray-500 text-center">No accepted tasks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {acceptedTasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col"
            >
              <img
                src={task.coverImage}
                alt={task.title}
                className="w-full h-40 object-cover rounded mb-3"
              />
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p className="text-gray-500 mb-2">{task.category}</p>
              <p className="text-gray-700 mb-4 flex-1">{task.summary}</p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleRemove(task._id, "done")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition flex-1"
                >
                  ✅ Done
                </button>
                <button
                  onClick={() => handleRemove(task._id, "cancel")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex-1"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAcceptedTasks;
