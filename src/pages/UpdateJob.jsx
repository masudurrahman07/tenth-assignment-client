import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/jobs/${id}`);
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
      const res = await fetch(`http://localhost:3000/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedJob),
      });
      if (!res.ok) throw new Error("Failed to update job.");
      toast.success("Job updated successfully!");
      navigate("/allJobs"); // Redirect to all jobs after update
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Update Job
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          defaultValue={job.title}
          name="title"
          placeholder="Job Title"
          className="input input-bordered w-full"
          required
        />
        <input
          defaultValue={job.category}
          name="category"
          placeholder="Category"
          className="input input-bordered w-full"
          required
        />
        <textarea
          defaultValue={job.summary}
          name="summary"
          placeholder="Job Summary"
          className="textarea textarea-bordered w-full"
          required
        />
        <input
          defaultValue={job.coverImage}
          name="coverImage"
          placeholder="Cover Image URL"
          className="input input-bordered w-full"
          required
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={updating}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-white shadow-md transition-colors ${
            updating
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {updating ? "Updating..." : "Update Job"}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default UpdateJob;
