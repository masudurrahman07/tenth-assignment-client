import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full bg-white dark:bg-gray-950 transition-colors duration-300">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-blue-500 border-t-transparent dark:border-[#36e2c3] dark:border-t-transparent rounded-full"/>
      <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium text-sm">Loading... </p>
    </div>
  );
};

export default LoadingSpinner;