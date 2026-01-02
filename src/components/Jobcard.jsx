import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job, currentUserEmail }) => {
  const isOwner = currentUserEmail === job.userEmail;

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 flex flex-col">
      
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={job.coverImage}
          alt={job.title}
          loading="lazy"
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-3 left-3 bg-white/90 dark:bg-gray-800/90 text-xs font-medium text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full backdrop-blur">
          {job.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white line-clamp-2">
          {job.title}
        </h2>
        <p className="text-sm mb-4 text-gray-600 dark:text-gray-300 line-clamp-3">
          {job.summary}
        </p>

        <div className="mt-auto">
          <p className="text-xs mb-4 text-gray-400 dark:text-gray-500">
            Posted by{" "}
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {job.postedBy}
            </span>
          </p>

          <div className="flex gap-2">
            <Link
              to={`/allJobs/${job._id}`}
              className="flex-1 text-center bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200"
            >
              View Details
            </Link>

            {!isOwner && currentUserEmail && (
              <Link
                to={`/allJobs/${job._id}`}
                className="flex-1 text-center bg-linear-to-r from-green-400 via-green-500 to-green-600  text-white text-sm font-medium py-2 rounded-lg transition-colors duration-200"
              >
                Accept
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
