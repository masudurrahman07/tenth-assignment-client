// src/components/Footer.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 text-white py-10 mt-10"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold mb-3">Freelance<span className="text-blue-200">Hub</span></h2>
          <p className="text-sm leading-relaxed text-blue-100">
            A platform where freelancers and clients connect to create amazing work together. Explore jobs, post tasks, and collaborate with ease.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/allJobs" className="hover:text-white transition-colors">All Jobs</Link></li>
            <li><Link to="/addJob" className="hover:text-white transition-colors">Add Job</Link></li>
            <li><Link to="/myAddedJobs" className="hover:text-white transition-colors">My Added Jobs</Link></li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5 text-blue-200 text-2xl">
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#fff" }} transition={{ type: "spring", stiffness: 300 }}><FaFacebook /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#fff" }} transition={{ type: "spring", stiffness: 300 }}><FaTwitter /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#fff" }} transition={{ type: "spring", stiffness: 300 }}><FaInstagram /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#fff" }} transition={{ type: "spring", stiffness: 300 }}><FaGithub /></motion.a>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-blue-400 mt-8 pt-4 text-center text-blue-100 text-sm">
        © {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
