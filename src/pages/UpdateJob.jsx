// src/pages/UpdateJob.jsx
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const UpdateJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Web Development");
  const [summary, setSummary] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const imgbbAPIKey = "d2719ed1cd968e8a0eb1e2436fe20ef8"; 

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/jobs/${id}`);
        setJob(res.data);
        setTitle(res.data.title);
        setCategory(res.data.category);
        setSummary(res.data.summary);

        // Check ownership
        if (user && user.email !== res.data.userEmail) {
          toast.error("You are not allowed to edit this job.");
          navigate("/allJobs");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch job details.");
        navigate("/allJobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id, user, navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = job.coverImage;

      // Upload new image if selected
      if (coverImage) {
        const formData = new FormData();
        formData.append("image", coverImage);
        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
          formData
        );
        imageUrl = imgbbRes.data.data.url;
      }

      const updatedJob = {
        title,
        category,
        summary,
        coverImage: imageUrl,
      };

      // Update job on backend
      await axios.put(`http://localhost:3000/jobs/${id}`, updatedJob);

      toast.success("Job updated successfully!");
      navigate("/myAddedJobs"); // Redirect to user's jobs page
    } catch (err) {
      console.error(err);
      toast.error("Failed to update job.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
      </div>
    );
  }

  if (!job) {
    return <p className="text-center mt-12">Job not found.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Update Job</h1>

      <form
        onSubmit={handleUpdate}
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
          />
          <p className="text-gray-500 text-sm mt-1">
            Leave empty to keep existing image
          </p>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
