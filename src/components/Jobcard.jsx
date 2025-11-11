// src/components/JobCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, currentUserEmail }) => {
  const isOwner = currentUserEmail === job.userEmail; // prevent accepting own job

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <img
        src={job.coverImage}
        alt={job.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{job.title}</h2>
        <p className="text-sm text-gray-500 mb-1">Category: {job.category}</p>
        <p className="text-sm text-gray-600 mb-3">{job.summary.slice(0, 80)}...</p>
        <p className="text-xs text-gray-400 mb-3">Posted by: {job.postedBy}</p>

        <div className="flex gap-2 flex-wrap">
          <Link
            to={`/allJobs/${job._id}`}
            className="inline-block bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            View Details
          </Link>

          {/* Accept button only if logged-in user is NOT the owner */}
          {!isOwner && currentUserEmail && (
            <Link
              to={`/allJobs/${job._id}`}
              className="inline-block bg-green-500 text-white text-sm px-3 py-1 rounded hover:bg-green-600 transition"
            >
              Accept Job
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
