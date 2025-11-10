// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 6 jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:3000/jobs?limit=6");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <section className="bg-blue-500 text-white py-20 px-4 text-center rounded-b-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to JobNest
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Your reliable freelance marketplace to post and accept jobs easily.
        </p>
        <a
          href="/addJob"
          className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition"
        >
          Create a Job
        </a>
      </section>

      {/* Latest Jobs Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Latest Jobs</h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[30vh]">
            <span className="loading loading-spinner loading-lg text-blue-500"></span>
          </div>
        ) : jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>

      {/* Top Categories Section */}
      <section className="bg-gray-100 py-12 px-4 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            { name: "Web Development", img: "https://i.ibb.co/FbX9T5s/webdev.jpg" },
            { name: "Digital Marketing", img: "https://i.ibb.co/YB7YwrR/marketing.jpg" },
            { name: "Graphic Designing", img: "https://i.ibb.co/1nZBvBP/design.jpg" },
            { name: "Content Writing", img: "https://i.ibb.co/sC6RJvD/writing.jpg" },
          ].map((cat, i) => (
            <div key={i} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition">
              <img src={cat.img} alt={cat.name} className="w-full h-32 object-cover" />
              <p className="text-center font-semibold py-2">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Platform Section */}
      <section className="container mx-auto px-4 text-center py-12">
        <h2 className="text-2xl font-bold mb-4">About JobNest</h2>
        <p className="text-gray-700 max-w-3xl mx-auto">
          JobNest is a modern freelance marketplace where businesses can post jobs
          and freelancers can accept and complete tasks efficiently. Our platform
          ensures secure, reliable, and timely job management for everyone.
        </p>
      </section>
    </div>
  );
};

export default Home;
