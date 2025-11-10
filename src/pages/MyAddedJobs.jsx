import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

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
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete job");

      setJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0)
    return <p className="text-center mt-10">You have not added any jobs yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="border p-4 rounded shadow hover:shadow-lg transition"
        >
          <img
            src={job.coverImage}
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
          <p className="text-sm text-gray-500 mb-2">Posted At: {new Date(job.postedAt).toLocaleDateString()}</p>

          <div className="flex gap-2 mt-2">
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
        </div>
      ))}
    </div>
  );
};

export default MyAddedJobs;
