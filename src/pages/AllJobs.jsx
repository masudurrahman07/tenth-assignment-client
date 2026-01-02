import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { HiChevronDown } from "react-icons/hi";

const AllJobs = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("latest");

  // Fetch jobs logic remains identical
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://freelance-hub-server-five.vercel.app/jobs"
        );

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

  if (loading) return <LoadingSpinner />;

  return (
    /* FIX: Added a wrapper div with min-h-screen and dark:bg-gray-950.
       This ensures the background covers the entire page regardless of content height.
    */
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto py-10 px-4">
        
        {/* Header + Sort Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              All Jobs
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Discover your next freelance opportunity
            </p>
          </div>

          <div className="relative inline-block group">
            <label className="sr-only">Sort by</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-5 py-2.5 pr-12 text-gray-700 dark:text-gray-200 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-200 cursor-pointer font-medium"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <HiChevronDown 
              className="pointer-events-none absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-blue-500 transition-colors" 
              size={18} 
            />
          </div>
        </div>

        {/* Job Grid Section */}
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
              No jobs found at the moment.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {jobs.map((job) => (
              <JobCard 
                key={job._id} 
                job={job} 
                currentUserEmail={user?.email} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;