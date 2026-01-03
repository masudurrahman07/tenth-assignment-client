import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job details");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleAcceptJob = async () => {
    if (!user) {
      toast.warning("Please log in to accept a job.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ acceptedBy: [user.email] }),
      });

      if (!res.ok) throw new Error("Failed to accept job");

      toast.success("Job accepted successfully!");
      navigate("/my-accepted-tasks");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">Job not found</p>
    </div>
  );

  const isOwner = user?.email === job.userEmail;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-12 px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800">
        {/* Header Image */}
        <div className="relative h-64 md:h-96">
          <img
            src={job.coverImage}
            alt={job.title}
            className="w-full h-full object-cover"/>
          <div className="absolute top-4 left-4">
            <span className="bg-[#36e2c3] text-gray-950 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
              {job.category}
            </span>
          </div>
        </div>

       
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {job.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
               <span className="font-medium">Posted By:</span>
               <span className="text-blue-600 dark:text-[#36e2c3]">{job.postedBy}</span>
            </div>
          </div>

          <div className="prose prose-blue dark:prose-invert max-w-none mb-10">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Job Summary</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
              {job.summary}
            </p>
          </div>

          
          <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
            {!isOwner ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAcceptJob}
                className="w-full md:w-auto bg-linear-to-r from-green-400 via-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-green-500/20 transition-all text-center">
                Accept This Job
              </motion.button>
            ) : (
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30">
                <p className="text-blue-700 dark:text-blue-300 italic text-center font-medium">
                  You are the author of this post. You cannot accept your own job.
                </p>
              </div>
            )}
            
            {!user && (
               <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                 Already have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/login')}>Login to apply.</span>
               </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default JobDetails;