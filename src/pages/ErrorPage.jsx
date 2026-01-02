import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import errorImg from '../assets/error-404.png';

function ErrorPage() {
  return (
    /* FIX: Added root wrapper with full-screen dark background and transition */
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gray-50 dark:bg-gray-950 px-4 transition-colors duration-300">
      
      {/* Animated Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          y: { duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
        }}
        
        className="mb-8"
      >
        <img 
          src={errorImg} 
          alt="404 Error" 
          className="max-w-xs md:max-w-md drop-shadow-2xl"
        />
      </motion.div>

      {/* Text Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-gray-900 dark:text-white text-3xl md:text-5xl font-extrabold mb-4">
          Oops! Page not found.
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 max-w-md mx-auto">
          The page you are looking for has been moved, deleted, or never existed in the first place.
        </p>

        {/* Home Button */}
        <Link 
          to="/" 
          className="inline-block bg-blue-600 dark:bg-[#36e2c3] text-white dark:text-[#0b1a26] font-bold px-8 py-3 rounded-xl shadow-lg hover:opacity-90 transition-all transform hover:scale-105 active:scale-95"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  );
}

export default ErrorPage;