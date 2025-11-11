// src/pages/AllJobs.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";
import { HiChevronDown } from "react-icons/hi";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest"); // latest or oldest

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/jobs");
        const sortedJobs = res.data.sort((a, b) =>
          sortOrder === "latest"
            ? new Date(b.postedAt) - new Date(a.postedAt)
            : new Date(a.postedAt) - new Date(b.postedAt)
        );
        setJobs(sortedJobs);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast.error("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [sortOrder]);

  // Delete job with SweetAlert confirmation
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/jobs/${id}`);
        setJobs(jobs.filter((job) => job._id !== id));
        Swal.fire("Deleted!", "The job has been deleted.", "success");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job.");
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-center sm:text-left text-gray-800">
          All Jobs
        </h1>

        {/* Sort Dropdown */}
        <div className="relative inline-block">
          <label className="sr-only">Sort by</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 cursor-pointer"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
          <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>
      </div>

      {/* Jobs Grid */}
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllJobs;
