import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch accepted jobs
  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();

        // Filter jobs accepted by current user
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

  // Handle Done / Cancel
  const handleAction = async (jobId, action) => {
    const confirm = await Swal.fire({
      title:
        action === "done"
          ? "Mark this task as done?"
          : "Cancel this accepted task?",
      text:
        action === "done"
          ? "Once done, it will be removed from your accepted tasks."
          : "Are you sure you want to cancel this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: action === "done" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: action === "done" ? "Yes, Done!" : "Yes, Cancel!",
    });

    if (!confirm.isConfirmed) return;

    try {
      // Use removeUser field to safely remove only current user
      const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ removeUser: user.email }),
      });

      if (!res.ok) throw new Error("Failed to update job");

      // Remove from UI instantly
      setJobs((prev) => prev.filter((j) => j._id !== jobId));

      toast.success(
        `Task ${action === "done" ? "completed" : "cancelled"} successfully`
      );
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0)
    return <p className="text-center mt-10">No accepted tasks yet</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AnimatePresence>
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={job.coverImage}
              alt={job.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
            <p className="text-sm text-gray-500 mb-1">
              Category: {job.category}
            </p>
            <p className="text-gray-700 mb-2">
              {job.summary.length > 80
                ? job.summary.slice(0, 80) + "..."
                : job.summary}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Posted By: {job.postedBy}
            </p>

            <div className="flex gap-2 mt-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(job._id, "done")}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded transition flex-1"
              >
                 Done
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAction(job._id, "cancel")}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition flex-1"
              >
                 Cancel
              </motion.button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MyAcceptedTasks;
