// src/pages/MyAcceptedTasks.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all jobs that the user has accepted
  useEffect(() => {
    const fetchAcceptedTasks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/jobs");
        // Filter jobs where userEmailAccepted includes the logged-in user's email
        const accepted = res.data.filter(
          (job) =>
            job.acceptedBy && job.acceptedBy.includes(user.email)
        );
        setTasks(accepted);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch accepted tasks.");
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedTasks();
  }, [user.email]);

  const handleDoneOrCancel = async (id) => {
    try {
      // Remove user from acceptedBy array or delete job if needed
      const task = tasks.find((t) => t._id === id);
      if (!task) return;

      // If you want, you can fully delete the job or just remove user from acceptedBy
      // For simplicity, let's remove from UI and backend entirely
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.success("Task removed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove task.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">
        You haven't accepted any tasks yet.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        My Accepted Tasks
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
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
                onClick={() => handleDoneOrCancel(task._id)}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition flex-1"
              >
                ✅ Done
              </button>
              <button
                onClick={() => handleDoneOrCancel(task._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex-1"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;
