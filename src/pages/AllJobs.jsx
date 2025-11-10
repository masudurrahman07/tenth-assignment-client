// src/pages/AllJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">All Jobs</h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[30vh]">
          <span className="loading loading-spinner loading-lg text-blue-500"></span>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
