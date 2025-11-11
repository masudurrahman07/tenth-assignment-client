import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const MyAcceptedTasks = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAcceptedJobs = async () => {
      try {
        const res = await fetch("http://localhost:3000/jobs");
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

 const handleRemoveJob = async (jobId) => {
  try {
    const res = await fetch(`http://localhost:3000/jobs/${jobId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ removeUser: user.email }),
    });

    if (!res.ok) throw new Error("Failed to update job");

    // Remove from UI immediately
    setJobs((prev) => prev.filter((j) => j._id !== jobId));
    toast.success("Task removed successfully!");
  } catch (err) {
    toast.error(err.message);
  }
};


  if (loading) return <LoadingSpinner />;

  if (jobs.length === 0)
    return <p className="text-center mt-10">No accepted tasks yet</p>;

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
          <p className="text-sm text-gray-500 mb-2">Posted By: {job.postedBy}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleRemoveJob(job._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
               Cancel
            </button>
            <button
              onClick={() => handleRemoveJob(job._id)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
               Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyAcceptedTasks;
