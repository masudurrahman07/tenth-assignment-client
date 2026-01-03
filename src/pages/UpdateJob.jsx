import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${id}`);
        if (!res.ok) throw new Error("Failed to fetch job details.");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    const form = e.target;
    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
    };

    try {
      const res = await fetch(`https://freelance-hub-server-five.vercel.app/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) throw new Error("Failed to update job.");
      toast.success("Job updated successfully!");
      navigate("/allJobs");
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-12 px-4">
      <motion.div
        className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}>
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-[#36e2c3]">Update Job</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title
            </label>
            <input
              defaultValue={job?.title}
              name="title"
              placeholder="Job Title"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required/>
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Category </label>
            <input
              defaultValue={job?.category}
              name="category"
              placeholder="Category"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required/>
          </div>

      
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Job Summary</label>
            <textarea
              defaultValue={job?.summary}
              name="summary"
              placeholder="Job Summary"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              rows={4}
              required/>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Cover Image URL </label>
            <input
              defaultValue={job?.coverImage}
              name="coverImage"
              placeholder="Cover Image URL"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required/>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={updating}
            className={`w-full py-4 rounded-xl font-bold shadow-lg transition-all text-white ${
              updating
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 dark:bg-[#36e2c3] dark:text-gray-950 dark:hover:bg-[#2bc9ad]"
            }`}>
            {updating ? "Updating..." : "Update Job"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateJob;