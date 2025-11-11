import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/jobs");
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
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete job");

        setJobs((prev) => prev.filter((job) => job._id !== jobId));
        Swal.fire("Deleted!", "Job has been deleted.", "success");
      } catch (err) {
        Swal.fire("Error!", err.message, "error");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0)
    return <p className="text-center mt-10">You have not added any jobs yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <motion.div
          key={job._id}
          whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
          transition={{ duration: 0.2 }}
          className="border p-4 rounded shadow flex flex-col"
        >
          <img
            src={job.coverImage || "https://via.placeholder.com/400x200"}
            alt={job.title}
            className="w-full h-40 object-cover rounded mb-2"
          />
          <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
          <p className="text-sm text-gray-500 mb-1">Category: {job.category}</p>
          <p className="text-gray-700 mb-2">
            {job.summary.length > 80
              ? job.summary.slice(0, 80) + "..."
              : job.summary}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Posted At: {new Date(job.postedAt).toLocaleDateString()}
          </p>

          <div className="flex gap-2 mt-auto">
            <Link
              to={`/updateJob/${job._id}`}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MyAddedJobs;
