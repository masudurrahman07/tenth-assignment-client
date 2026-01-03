import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import { HiChevronDown, HiSearch } from "react-icons/hi";

const AllJobs = () => {
  const { user } = useContext(AuthContext);

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("latest");


  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 6;


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(
          "https://freelance-hub-server-five.vercel.app/jobs"
        );
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  useEffect(() => {
    let updated = [...jobs];


    if (search) {
      updated = updated.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

  
    if (category !== "all") {
      updated = updated.filter((job) => job.category === category);
    }

    if (timeFilter !== "all") {
      const now = new Date();
      updated = updated.filter((job) => {
        const posted = new Date(job.postedAt);
        const diffDays = (now - posted) / (1000 * 60 * 60 * 24);

        if (timeFilter === "7") return diffDays <= 7;
        if (timeFilter === "30") return diffDays <= 30;
        return true;
      });
    }

 
    updated.sort((a, b) =>
      sortOrder === "latest"
        ? new Date(b.postedAt) - new Date(a.postedAt)
        : new Date(a.postedAt) - new Date(b.postedAt)
    );

    setFilteredJobs(updated);
    setCurrentPage(1);
  }, [search, category, timeFilter, sortOrder, jobs]);

 
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const paginatedJobs = filteredJobs.slice(
    startIndex,
    startIndex + jobsPerPage
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto py-10 px-4">

    
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Explore Jobs
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Search and filter freelance opportunities </p>
        </div>

       
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 mb-12 grid grid-cols-1 md:grid-cols-4 gap-4">

   
          <div className="relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border dark:border-gray-700 bg-transparent"/>
          </div>

 
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl px-4 py-2 border dark:border-gray-700 bg-transparent">
            <option value="all">All Categories</option>
            <option value="Web Development">Web Development</option>
            <option value="Digital Marketing">Digital Marketing</option>
            <option value="Graphics Designing">Graphics Designing</option>
          </select>

         
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="rounded-xl px-4 py-2 border dark:border-gray-700 bg-transparent">
            <option value="all">Any Time</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
          </select>

         
          <div className="relative">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="appearance-none w-full rounded-xl px-4 py-2 border dark:border-gray-700 bg-transparent">
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <HiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

      
        {paginatedJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No jobs found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {paginatedJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                currentUserEmail={user?.email}
              />
            ))}
          </div>
        )}

      
        {totalPages > 1 && (
          <div className="flex justify-center mt-14 gap-3">
            {[...Array(totalPages).keys()].map((num) => {
              const page = num + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg font-medium transition
                    ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow"
                        : "bg-white dark:bg-gray-800 border dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}>
                  {page}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default AllJobs;
