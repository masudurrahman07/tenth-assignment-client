// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetching latest 6 jobs from the backend
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
        <motion.section
      className="bg-blue-500 text-white py-20 px-4 text-center rounded-b-lg"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }} 
      transition={{ duration: 0.8, ease: "easeOut" }}>

      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}>
        Welcome to FreelanceHub
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl mb-6"
        initial={{ x: -30, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}>
        Your reliable freelance marketplace to post and accept jobs easily.
      </motion.p>

      <motion.a
        href="/addJob"
        className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-lg shadow inline-block"
        whileHover={{ scale: 1.05, backgroundColor: "#f0f0f0" }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}>
        Create a Job
      </motion.a>
    </motion.section>

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
    { name: "Web Development", img: "https://i.ibb.co/t5G4BWH/web-development.jpg" },
    { name: "Digital Marketing", img: "https://i.ibb.co.com/pj9ChF5M/illustration-digital-marketing.jpg" },
    { name: "Graphic Designing", img: "https://i.ibb.co.com/ZpkX2vnh/The-Evolution-of-Graphic-Design-in-the-Digital-Age-01-scaled.jpg" },
    { name: "Content Writing", img: "https://i.ibb.co.com/zVJn20dx/content-writing-2.png" },
  ].map((cat, i) => (
    <div
      key={i}
      className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
    >
      <div className="relative w-full pt-[56.25%]"> {/* 16:9 aspect ratio */}
        <img
          src={cat.img}
          alt={cat.name}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
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
