import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        const res = await fetch("https://freelance-hub-server-five.vercel.app/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();

        const accepted = data.filter(
          (job) => job.acceptedBy && job.acceptedBy.includes(user.email)
        );
        setJobs(accepted);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedJobs();
  }, [user.email]);

  const handleAction = async (jobId, action) => {
    const isDark = document.documentElement.classList.contains("dark");

    const confirm = await Swal.fire({
      title: action === "done" ? "Mark this task as done?" : "Cancel this accepted task?",
      text: action === "done" 
        ? "Once done, it will be removed from your accepted tasks." 
        : "Are you sure you want to cancel this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "done" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: action === "done" ? "Yes, Done!" : "Yes, Cancel!",
      background: isDark ? "#111827" : "#fff",
      color: isDark ? "#fff" : "#545454",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ removeUser: user.email }),
      });

      if (!res.ok) throw new Error("Failed to update job");

      setJobs((prev) => prev.filter((j) => j._id !== jobId));
      toast.success(`Task ${action === "done" ? "completed" : "cancelled"} successfully`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-l-4 border-green-500 pl-4">
          My Accepted Tasks</h2>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-lg text-gray-500 dark:text-gray-400">No accepted tasks yet</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {jobs.map((job) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col">
                  <img
                    src={job.coverImage || "https://via.placeholder.com/400x200"}
                    alt={job.title}
                    className="w-full h-44 object-cover rounded-xl mb-4"/>

                  <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{job.title}</h3>

                  <p className="text-xs font-semibold text-blue-500 dark:text-[#36e2c3] uppercase mb-2">
                    {job.category}
                  </p>

                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                    {job.summary.length > 80 ? job.summary.slice(0, 80) + "..." : job.summary}</p>

                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 mt-auto">
                    Posted By: <span className="font-medium">{job.postedBy}</span> </p>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction(job._id, "done")}
                      className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white font-bold py-2 rounded-lg flex-1 transition shadow-md">
                      Done
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAction(job._id, "cancel")}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-red-400 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 dark:hover:text-white font-bold py-2 rounded-lg transition flex-1">Cancel
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAcceptedTasks;