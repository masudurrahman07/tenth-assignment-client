import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

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
        toast.error("Failed to fetch jobs.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    // ✅ SweetAlert confirmation
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
      <h1 className="text-3xl font-bold mb-6 text-center">All Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
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
