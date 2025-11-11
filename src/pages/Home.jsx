// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";

const categories = [
  { name: "Web Development", img: "https://i.ibb.co/t5G4BWH/web-development.jpg" },
  { name: "Digital Marketing", img: "https://i.ibb.co/pj9ChF5M/illustration-digital-marketing.jpg" },
  { name: "Graphic Designing", img: "https://i.ibb.co/ZpkX2vnh/The-Evolution-of-Graphic-Design-in-the-Digital-Age-01-scaled.jpg" },
  { name: "Content Writing", img: "https://i.ibb.co/zVJn20dx/content-writing-2.png" },
];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch latest 6 jobs
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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-16">
{/* Banner */}
{/* Banner */}
<motion.section
  className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center rounded-b-lg overflow-hidden"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: false }}  // <- triggers every time it comes into view
  transition={{ duration: 0.6 }}
>
  {/* Full-width image with balanced head visibility */}
  <motion.img
    src="https://i.ibb.co.com/hJZwKzXh/smiling-man-surfing-net-laptop-while-drinking-coffee-bar.jpg"
    alt="Banner"
    className="absolute top-0 left-0 w-full h-full object-cover object-[center_25%]"
    initial={{ scale: 1.2, opacity: 0 }}
    whileInView={{ scale: 1, opacity: 1 }}
    viewport={{ once: false }} // <- triggers every time in view
    transition={{ duration: 1.5, ease: "easeOut" }}
  />

  {/* Overlay with text */}
  <motion.div
    className="relative z-10 flex flex-col items-center justify-center px-4"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }} // <- triggers every time in view
    transition={{ duration: 1, delay: 0.5 }}
  >
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
      Welcome to FreelanceHub
    </h1>
    <p className="text-base md:text-lg lg:text-xl text-white max-w-2xl mb-4">
      Your reliable freelance marketplace to post and accept jobs easily.
    </p>
    <a
      href="/addJob"
      className="bg-white text-blue-500 font-semibold px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition text-sm"
    >
      Create a Job
    </a>
  </motion.div>
</motion.section>








      {/* Latest Jobs */}
      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Latest Jobs</h2>
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              whileHover={{ scale: 1.03 }}
              className="transition"
            >
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
      className="container mx-auto px-4 py-16 text-center bg-linear-to-r from-blue-50 to-blue-100 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
        About FreelanceHub
      </h2>
      <p className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
        FreelanceHub is a modern freelance marketplace where businesses can post jobs
        and freelancers can accept and complete tasks efficiently. Our platform
        ensures secure, reliable, and timely job management for everyone.
      </p>
      <motion.div
        className="mt-8"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <a
          href="/addJob"
          className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition transform hover:-translate-y-1"
        >
          Post a Job
        </a>
      </motion.div>
    </motion.section>

      {/* Top Categories */}
      <motion.section
        className="bg-gray-100 py-12 px-4 rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Top Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="relative w-full pt-[56.25%]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>
              <p className="text-center font-semibold py-2">{cat.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
