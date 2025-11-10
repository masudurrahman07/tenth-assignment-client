import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import JobCard from "../components/JobCard";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="max-w-6xl mx-auto p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {jobs.map((job) => (
        <motion.div whileHover={{ scale: 1.03 }} key={job._id}>
          <JobCard job={job} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AllJobs;
