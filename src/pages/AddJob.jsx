import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Web Development",
    "Digital Marketing",
    "Graphic Designing",
    "Content Writing",
    "Mobile App Development",
    "SEO",
    "Other",
  ];

  const handleAddJob = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
      postedBy: user?.displayName,
      userEmail: user?.email,
      postedAt: new Date(),
    };

    try {
      const res = await fetch("https://freelance-hub-server-five.vercel.app/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) throw new Error("Failed to add job");

      form.reset();
      toast.success("Job added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    
        className="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Add a New Job
          </h2>
          <p className="text-gray-500 dark:text-gray-400">Fill in the details to post a new freelance opportunity</p>
        </div>

        <form onSubmit={handleAddJob} className="space-y-5">
         
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Senior React Developer"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required/></div>

       
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              name="category"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all cursor-pointer"
              defaultValue=""
              required>
              <option value="" disabled className="dark:bg-gray-900">Select Category</option>
              {categories.map((cat, i) => (
                <option key={i} value={cat} className="dark:bg-gray-900">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Summary
            </label>
            <textarea
              name="summary"
              placeholder=""
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              rows={4}
              required/>
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Cover Image URL
            </label>
            <input
              type="url"
              name="coverImage"
              placeholder="https://example.com/image.jpg"
              className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              required/>
          </div>

         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                Poster Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1"> Poster Email </label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-gray-500 dark:text-gray-400 cursor-not-allowed"/>
            </div>
          </div>

        
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-[#36e2c3] dark:hover:bg-[#2bc9ad] text-white dark:text-gray-950 font-bold py-4 rounded-xl shadow-lg transition-all mt-6">Add Job
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddJob;