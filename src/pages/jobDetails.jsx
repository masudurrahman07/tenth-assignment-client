// src/pages/JobDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/jobs/${id}`);
        setJob(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) {
      toast.error("You must be logged in to accept a job.");
      return;
    }

    if (user.email === job.userEmail) {
      toast.error("You cannot accept your own job.");
      return;
    }

    setAccepting(true);
    try {
      
      const acceptedTasks =
        JSON.parse(localStorage.getItem("acceptedTasks")) || [];
      
      if (acceptedTasks.find((t) => t._id === job._id)) {
        toast.info("You already accepted this job.");
      } else {
        acceptedTasks.push(job);
        localStorage.setItem("acceptedTasks", JSON.stringify(acceptedTasks));
        toast.success("Job accepted!");
        navigate("/my-accepted-tasks"); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to accept job.");
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!job) {
    return <p className="text-center mt-12">Job not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <img
        src={job.coverImage}
        alt={job.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
      <p className="text-gray-500 mb-2">Category: {job.category}</p>
      <p className="text-gray-400 mb-4">Posted by: {job.postedBy}</p>
      <p className="text-gray-700 mb-6">{job.summary}</p>

      {user && user.email !== job.userEmail && (
        <button
          onClick={handleAcceptJob}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
          disabled={accepting}
        >
          {accepting ? "Accepting..." : "Accept Job"}
        </button>
      )}

      {!user && (
        <p className="text-red-500 font-semibold">
          Login to accept this job.
        </p>
      )}

      {user && user.email === job.userEmail && (
        <p className="text-gray-500 font-semibold">
          You posted this job, cannot accept your own job.
        </p>
      )}
    </div>
  );
};

export default JobDetails;
