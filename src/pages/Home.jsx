// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import JobCard from "../components/JobCard";

const categories = [
  { name: "Web Development", img: "https://i.ibb.co/t5G4BWH/web-development.jpg" },
  { name: "Digital Marketing", img: "https://i.ibb.co/pj9ChF5M/illustration-digital-marketing.jpg" },
  { name: "Graphic Designing", img: "https://i.ibb.co/ZpkX2vnh/The-Evolution-of-Graphic-Design-in-the-Digital-Age-01-scaled.jpg" },
  { name: "Content Writing", img: "https://i.ibb.co/zVJn20dx/content-writing-2.png" },
];

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://freelance-hub-server-five.vercel.app/jobs?limit=6");
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
 
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      
      <div className="space-y-16 pb-16">
        
   
        <motion.section
          className="relative w-full min-h-[500px] md:min-h-[600px] flex items-center justify-center text-center overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}>
          <motion.img
            src="https://i.ibb.co.com/hJZwKzXh/smiling-man-surfing-net-laptop-while-drinking-coffee-bar.jpg"
            alt="Banner"
            className="absolute top-0 left-0 w-full h-full object-cover object-[center_25%] brightness-75 dark:brightness-50"
            initial={{ scale: 1.2, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: "easeOut" }}/>

          <motion.div
            className="relative z-10 flex flex-col items-center justify-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.5 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
              Welcome to <span className="text-[#36e2c3]">FreelanceHub</span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-100 max-w-2xl mb-8 drop-shadow-md">
              Your reliable freelance marketplace to post and accept jobs easily.
            </p>
            <a 
              href="/addJob" 
              className="bg-[#36e2c3] text-[#0b1a26] font-bold px-8 py-3 rounded-xl shadow-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95 text-lg">
              Create a Job</a>
          </motion.div>
        </motion.section>

    
        <section className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8 border-l-4 border-[#36e2c3] pl-4">
             <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Jobs</h2>
             <a href="/allJobs" className="text-sm font-semibold text-blue-500 hover:text-[#36e2c3] transition-colors">View All &rarr;</a>
          </div>
          
          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            {jobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ y: -10 }}
                className="transition">
                <JobCard job={job} />
              </motion.div>
            ))}
          </motion.div>
        </section>

  
        <motion.section
          className="container mx-auto px-6 py-20 text-center bg-blue-50/50 dark:bg-gray-900/40 rounded-4xl border border-blue-100 dark:border-gray-800 shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-[#36e2c3] mb-6">About FreelanceHub</h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            FreelanceHub is a modern freelance marketplace where businesses can post jobs
            and freelancers can accept and complete tasks efficiently. Our platform
            ensures secure, reliable, and timely job management for everyone.</p>

          <motion.div
            className="mt-10"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <a href="/addJob" className="inline-block bg-blue-500 dark:bg-[#36e2c3] dark:text-[#0b1a26] text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:opacity-90 transition transform hover:-translate-y-1">
              Post your first Job </a>
          </motion.div>
        </motion.section>

   
        <motion.section
          className="container mx-auto py-12 px-6 rounded-3xl transition-colors duration-300 bg-gray-50 dark:bg-gray-900/20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-bold mb-10 text-center text-gray-900 dark:text-white uppercase tracking-widest">
            Top Categories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900" >
                <div className="relative w-full pt-[65%] overflow-hidden">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-110 dark:opacity-70"/>
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-4 text-center">
                  <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 dark:group-hover:text-[#36e2c3] transition-colors">
                    {cat.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default Home;