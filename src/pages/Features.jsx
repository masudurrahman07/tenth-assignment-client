import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Globe,
  Search,
  CheckCircle,
  Layout,
} from "lucide-react";

const Features = () => {
  const coreFeatures = [
    {
      icon: <Briefcase size={20} />,
      text: "Post Jobs",
      color: "text-green-500",
    },
    {
      icon: <Search size={20} />,
      text: "Find & Apply",
      color: "text-blue-500",
    },
    {
      icon: <CheckCircle size={20} />,
      text: "Manage Work",
      color: "text-green-500",
    },
    {
      icon: <Layout size={20} />,
      text: "Project Boards",
      color: "text-yellow-500",
    },
    {
      icon: <Users size={20} />,
      text: "User Profiles",
      color: "text-purple-500",
    },
    { icon: <Globe size={20} />, text: "Global Reach", color: "text-sky-500" },
  ];

  const infrastructure = [
    {
      icon: <ShieldCheck size={18} />,
      text: "Secure Auth",
      color: "text-red-500",
    },
    {
      icon: <Globe size={18} />,
      text: "Cloud Hosting",
      color: "text-blue-400",
    },
    {
      icon: <Zap size={18} />,
      text: "Realtime Updates",
      color: "text-yellow-500",
    },
    {
      icon: <Layers size={18} />,
      text: "Modular Design",
      color: "text-indigo-500",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto overflow-hidden rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800"
      >
        {/* Header Section with your signature gradient */}
        <div className="bg-linear-to-br from-green-400 via-green-500 to-blue-600 p-10 text-center relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex justify-center items-center gap-2 mb-4">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <Briefcase className="text-white" size={28} />
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Freelance<span className="opacity-80">Hub</span>{" "}
                <span className="text-2xl opacity-60">3.0</span>
              </h1>
            </div>

            <h2 className="text-5xl font-black text-white mb-4 drop-shadow-md">
              Work reimagined.
            </h2>
            <p className="text-white/90 text-xl font-medium">
              Secure, efficient, and connected.
            </p>
          </div>
        </div>

        {/* Features Content */}
        <div className="bg-white dark:bg-gray-900 p-8 md:p-12 space-y-10">
          {/* Core Features Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                Core Features
              </h3>
              <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md uppercase">
                New
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {coreFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className={`${item.color}`}>{item.icon}</span>
                  <span className="font-semibold text-gray-700 dark:text-gray-300">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Infrastructure Section */}
          <section>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Platform Infrastructure
              </h3>
              <span className="bg-yellow-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-md uppercase">
                Enhanced
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructure.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span
                    className={`${item.color} p-2 bg-gray-50 dark:bg-gray-800 rounded-lg`}
                  >
                    {item.icon}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action Footer */}

          <div className="pt-6">
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-linear-to-r from-green-500 to-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-500/20"
              >
                Get Started with FreelanceHub
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Features;
