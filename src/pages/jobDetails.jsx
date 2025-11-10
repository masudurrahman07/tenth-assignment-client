import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job details");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (user.email === job.userEmail) {
      toast.error("You cannot accept your own job");
      return;
    }

    try {
      const updatedJob = {
        ...job,
        acceptedBy: job.acceptedBy ? [...job.acceptedBy, user.email] : [user.email],
      };

      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });

      if (!res.ok) throw new Error("Failed to accept job");
      toast.success("Job accepted!");
      navigate("/my-accepted-tasks");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!job) return <p className="text-center mt-10">Job not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={job.coverImage}
        alt={job.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
      <p className="text-sm text-gray-500 mb-2">Category: {job.category}</p>
      <p className="text-gray-700 mb-4">{job.summary}</p>
      <p className="text-sm text-gray-500 mb-4">Posted By: {job.postedBy}</p>

      {user && (
        <button
          onClick={handleAcceptJob}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Accept Job
        </button>
      )}
    </div>
  );
};

export default JobDetails;
