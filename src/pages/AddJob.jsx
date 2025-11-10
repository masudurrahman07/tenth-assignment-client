import { useState } from "react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const AddJob = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

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

    await fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newJob),
    });

    form.reset();
    setLoading(false);
    alert("Job Added Successfully!");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Job</h2>
      <form onSubmit={handleAddJob} className="space-y-4">
        <input type="text" name="title" placeholder="Job Title" className="input input-bordered w-full" required />
        <input type="text" name="category" placeholder="Category" className="input input-bordered w-full" required />
        <textarea name="summary" placeholder="Job Summary" className="textarea textarea-bordered w-full" required></textarea>
        <input type="url" name="coverImage" placeholder="Cover Image URL" className="input input-bordered w-full" required />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-primary w-full"
        >
          Add Job
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddJob;
