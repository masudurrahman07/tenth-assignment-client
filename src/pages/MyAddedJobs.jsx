// src/pages/MyAddedJobs.jsx
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAddedJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/jobs");
        
        const myJobs = res.data.filter((job) => job.userEmail === user.email);
        setJobs(myJobs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch your jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [user.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;

    try {
      await axios.delete(`http://localhost:3000/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete job.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/updateJob/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <p className="text-center mt-12 text-gray-500">
        You haven't added any jobs yet.
      </p>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Added Jobs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border rounded-lg p-4 shadow hover:shadow-md transition flex flex-col"
          >
            <img
              src={job.coverImage}
              alt={job.title}
              className="w-full h-40 object-cover rounded mb-3"
            />
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-500 mb-2">{job.category}</p>
            <p className="text-gray-700 mb-4 flex-1">{job.summary}</p>

            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(job._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition flex-1"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition flex-1"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedJobs;
