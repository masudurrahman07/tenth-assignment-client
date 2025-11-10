// src/pages/AddJob.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const AddJob = () => {
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const imgbbAPIKey = "d2719ed1cd968e8a0eb1e2436fe20ef8"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!coverImage) {
      toast.error("Please select a cover image.");
      return;
    }

    setLoading(true);

    try {
      // Upload image to imgbb
      const formData = new FormData();
      formData.append("image", coverImage);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
        formData
      );

      const imageUrl = imgbbRes.data.data.url;

      // Prepare job object
      const jobData = {
        title,
        category,
        summary,
        coverImage: imageUrl,
        postedBy: user?.displayName || "Anonymous",
        userEmail: user?.email || "",
        postedAt: new Date(),
      };

      // Send to backend
      await axios.post("http://localhost:3000/jobs", jobData);

      toast.success("Job added successfully!");
      // Reset form
      setTitle("");
      setCategory("Web Development");
      setSummary("");
      setCoverImage(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Add a Job</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-4"
      >
        <div>
          <label className="block mb-1 font-semibold">Job Title</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Web Development</option>
            <option>Digital Marketing</option>
            <option>Graphic Designing</option>
            <option>Content Writing</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Summary</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Job"}
        </button>
      </form>
    </div>
  );
};

export default AddJob;
