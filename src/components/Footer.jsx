import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      /* REMOVED: mt-10 | ADDED: border-t and dark:bg-gray-950 */
      className="bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 dark:bg-none dark:bg-gray-950 border-t border-transparent dark:border-gray-800 text-white py-10 transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold mb-3">
            Freelance<span className="text-blue-200 dark:text-[#36e2c3]">Hub</span>
          </h2>
          <p className="text-sm leading-relaxed text-blue-100 dark:text-gray-400">
            A platform where freelancers and clients connect to create amazing work together. Explore jobs, post tasks, and collaborate with ease.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-blue-100 dark:text-gray-400">
            <li><Link to="/" className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">Home</Link></li>
            <li><Link to="/allJobs" className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">All Jobs</Link></li>
            <li><Link to="/addJob" className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">Add Job</Link></li>
            <li><Link to="/myAddedJobs" className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">My Added Jobs</Link></li>
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-5 text-blue-200 dark:text-gray-400 text-2xl">
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#36e2c3" }} transition={{ type: "spring", stiffness: 300 }}><FaFacebook /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#36e2c3" }} transition={{ type: "spring", stiffness: 300 }}><FaTwitter /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#36e2c3" }} transition={{ type: "spring", stiffness: 300 }}><FaInstagram /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2, color: "#36e2c3" }} transition={{ type: "spring", stiffness: 300 }}><FaGithub /></motion.a>
          </div>
        </motion.div>
      </div>

      {/* FIX: Updated border color for dark mode */}
      <div className="border-t border-blue-400 dark:border-gray-800 mt-8 pt-4 text-center text-blue-100 dark:text-gray-500 text-sm">
        © {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;