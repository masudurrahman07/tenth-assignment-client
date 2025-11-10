import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateJob = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedJob = {
      title: form.title.value,
      category: form.category.value,
      summary: form.summary.value,
      coverImage: form.coverImage.value,
    };

    await fetch(`http://localhost:3000/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedJob),
    });

    alert("Job Updated Successfully!");
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Update Job</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input defaultValue={job.title} name="title" className="input input-bordered w-full" />
        <input defaultValue={job.category} name="category" className="input input-bordered w-full" />
        <textarea defaultValue={job.summary} name="summary" className="textarea textarea-bordered w-full" />
        <input defaultValue={job.coverImage} name="coverImage" className="input input-bordered w-full" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="btn btn-primary w-full"
        >
          Update Job
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateJob;
