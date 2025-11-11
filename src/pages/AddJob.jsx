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
    "Other",];


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
      postedAt: new Date(),};


    try {
      const res = await fetch("https://freelance-hub-server-five.vercel.app/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),});


      if (!res.ok) throw new Error("Failed to add job");


      form.reset();
      toast.success("Job added successfully!");} 
      catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");} 
      finally {setLoading(false);}};

  if (loading) return <LoadingSpinner />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow-xl">

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800"> Add a New Job </h2>

      <form onSubmit={handleAddJob} className="space-y-5">
      
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 rounded-lg focus:border-blue-500 "
          required />

        
        <select
          name="category"
          className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
          defaultValue=""
          required>

          <option value="" disabled>Select Category </option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}</select>

        
        <textarea
          name="summary"
          placeholder="Job Summary"
          className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500 rounded-lg focus:border-blue-500 "
          rows={4}
          required/>

        
        <input
          type="url"
          name="coverImage"
          placeholder="Cover Image URL"
          className="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
          required/>

      
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg"/>

        
        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="input input-bordered w-full bg-gray-100 text-gray-700 rounded-lg"/>

        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg w-full shadow-md transition-all"> Add Job
        </motion.button>
      </form>
    </motion.div>
  );
};

export default AddJob;
