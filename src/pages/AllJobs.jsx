
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

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://freelance-hub-server-five.vercel.app/jobs");

        const sortedJobs = res.data.sort((a, b) =>
          sortOrder === "latest"
            ? new Date(b.postedAt) - new Date(a.postedAt)
            : new Date(a.postedAt) - new Date(b.postedAt));

        setJobs(sortedJobs);
      } 
      catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast.error("Failed to fetch jobs.");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchJobs();

  }, [sortOrder]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-10  px-4">
      
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 ">

        <h1 className="text-3xl font-bold text-center sm:text-left text-gray-800">All Jobs</h1>

      
        <div className="relative inline-block">
          <label className="sr-only">Sort by</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="appearance-none bg-white border border-gray-300 rounded-full px-4 py-2 pr-10 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200 cursor-pointer">
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>

          <HiChevronDown className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
        </div>

      </div>

    
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">No jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">

          {jobs.map((job) => (
            <JobCard key={job._id} job={job} currentUserEmail={user?.email} />))}
        </div>)}

    </div>

  );
};

export default AllJobs;
