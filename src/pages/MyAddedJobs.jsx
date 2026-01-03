import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyAddedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await fetch("https://freelance-hub-server-five.vercel.app/jobs");
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const data = await res.json();
        const myJobs = data.filter((job) => job.userEmail === user.email);
        setJobs(myJobs);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [user.email]);

  const handleDelete = async (jobId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: document.documentElement.classList.contains("dark") ? "#111827" : "#fff",
      color: document.documentElement.classList.contains("dark") ? "#fff" : "#545454",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${jobId}`, {
          method: "DELETE",
        });

        if (!res.ok) throw new Error("Failed to delete job");

        setJobs((prev) => prev.filter((job) => job._id !== jobId));
        Swal.fire({
          title: "Deleted!",
          text: "Job has been deleted.",
          icon: "success",
          background: document.documentElement.classList.contains("dark") ? "#111827" : "#fff",
          color: document.documentElement.classList.contains("dark") ? "#fff" : "#545454",
        });
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-10">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white border-l-4 border-yellow-500 pl-4">
          My Added Jobs</h2>

        {jobs.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800">
            <p className="text-lg text-gray-500 dark:text-gray-400">
              You have not added any jobs yet.</p>
            <Link to="/addJob" className="text-blue-500 hover:underline mt-4 inline-block">
              Post your first job now
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                /* FIX: Updated card colors for dark mode */
                className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col">
                <img
                  src={job.coverImage || "https://via.placeholder.com/400x200"}
                  alt={job.title}
                  className="w-full h-44 object-cover rounded-xl mb-4"/>

                <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">
                  {job.title}</h3>

                <p className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-[#36e2c3] mb-2">
                  {job.category}
                </p>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {job.summary.length > 80
                    ? job.summary.slice(0, 80) + "..."
                    : job.summary}
                </p>

                <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 mt-auto">
                  Posted: {new Date(job.postedAt).toLocaleDateString()}
                </p>

                <div className="flex gap-3">
                  <Link
                    to={`/updateJob/${job._id}`}
                    className="flex-1 text-center bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 font-bold px-3 py-2 rounded-lg hover:bg-yellow-500 hover:text-white transition-all">
                    Edit</Link>

                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex-1 bg-red-500/10 text-red-600 dark:text-red-400 font-bold px-3 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                    Delete</button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedJobs;