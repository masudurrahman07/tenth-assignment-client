// src/components/JobCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const JobCard = ({ job, onDelete }) => {
  const { user } = useContext(AuthContext);

  const isOwner = user?.email === job.userEmail; // Only owner can update/delete

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition flex flex-col">
      {/* Job Image */}
      <div className="relative w-full pt-[56.25%]">
        <img
          src={job.coverImage}
          alt={job.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-lg font-semibold text-gray-800 mb-1">{job.title}</h2>
        <p className="text-sm text-gray-500 mb-1">Category: {job.category}</p>
        <p className="text-sm text-gray-600 mb-2">{job.summary.slice(0, 80)}...</p>
        <p className="text-xs text-gray-400 mb-3">Posted by: {job.postedBy}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          <Link
            to={`/allJobs/${job._id}`}
            className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            View Details
          </Link>

          {isOwner && (
            <>
              <Link
                to={`/updateJob/${job._id}`}
                className="bg-yellow-400 text-white text-sm px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Update
              </Link>
              <button
                onClick={() => onDelete(job._id)}
                className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
