import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      className="bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 dark:bg-gray-950 border-t border-transparent dark:border-gray-800 text-white py-10 transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}>
          <h2 className="text-2xl font-bold mb-3">
            Freelance
            <span className="text-blue-200 dark:text-[#36e2c3]">Hub</span>
          </h2>
          <p className="text-sm leading-relaxed text-blue-100 dark:text-gray-400">
            A platform where freelancers and clients connect to create amazing
            work together. Explore jobs, post tasks, and collaborate with ease.
          </p>
        </motion.div>

       
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <h3 className="text-xl font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-blue-100 dark:text-gray-400">
            <li>
              <Link
                to="/pricing"
                className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link
                to="/upgrade-plan"
                className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">
                Upgrade Plan
              </Link>
            </li>
            <li>
              <Link
                to="/cookies"
                className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">
                Cookies
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                className="hover:text-white dark:hover:text-[#36e2c3] transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </motion.div>

  
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row md:justify-between md:gap-8">

          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-4 tracking-tight">Contact Us</h3>
            <ul className="space-y-4 text-blue-100 dark:text-gray-400 text-sm font-medium">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 text-blue-200 dark:text-[#36e2c3]" />
                <span className="truncate max-w-[200px]">support@freelancehub.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FaPhoneAlt className="mt-1 text-blue-200 dark:text-[#36e2c3]" />
                <span>+1 (555) 000-1234</span>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-blue-200 dark:text-[#36e2c3]" />
                <span>123 Tech Avenue, Silicon Valley, CA 94043</span>
              </li>
            </ul>
          </div>

        
          <div className="flex-1 mt-8 md:mt-0">
            <h3 className="text-xl font-semibold mb-4 tracking-tight">Follow Us</h3>
            <div className="flex space-x-5 text-blue-200 dark:text-gray-400 text-2xl">
              <motion.a whileHover={{ scale: 1.2, color: "#36e2c3" }}>
                <FaFacebook />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#36e2c3" }}>
                <FaTwitter />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#36e2c3" }}>
                <FaInstagram />
              </motion.a>
              <motion.a whileHover={{ scale: 1.2, color: "#36e2c3" }}>
                <FaGithub />
              </motion.a>
            </div>
          </div>
        </motion.div>

      </div>

      <div className="border-t border-blue-400 dark:border-gray-800 mt-8 pt-4 text-center text-blue-100 dark:text-gray-500 text-sm">
        © {new Date().getFullYear()} FreelanceHub. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
