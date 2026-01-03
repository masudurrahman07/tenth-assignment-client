import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed"));
    };

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const isDark = theme === "dark";


  const getNavLinks = (isMobile = false) => {
    return [
      { name: "Home", path: "/" },
      { name: "All Jobs", path: "/allJobs" },
      !user && { name: "Features", path: "/features" },
      { name: "Add Job", path: "/addJob", auth: true },
      { name: "My Added Jobs", path: "/myAddedJobs", auth: true },
      { name: "My Accepted Tasks", path: "/my-accepted-tasks", auth: true },
    ]
      .filter(Boolean)
      .map((link) => {
        if (link.auth && !user) return null;
        return (
          <li key={link.name} className={isMobile ? "w-full" : ""}>
            <NavLink
              to={link.path}
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "font-bold text-white px-4 py-2 rounded-lg bg-linear-to-r from-green-400 via-green-500 to-green-600 transition-all duration-200 block shadow-sm"
                  : `px-4 py-2 rounded-lg transition-all duration-200 block ${
                      isDark
                        ? "text-gray-200 hover:text-[#36e2c3] hover:bg-gray-800"
                        : isMobile
                        ? "text-gray-800 hover:text-blue-600 hover:bg-gray-100"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    }`
              }>
              {link.name}
            </NavLink>
          </li>
        );
      });
  };

  return (
    <header
      className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDark
          ? "bg-gray-950 border-b border-gray-800"
          : "bg-linear-to-r from-blue-700 via-sky-600 to-blue-500"
      }`}>

      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
      
        <Link
          to="/"
          className="text-2xl font-black flex items-center transition-transform hover:scale-105 tracking-tighter">
          <span className={isDark ? "text-[#36e2c3]" : "text-white"}>Freelance</span>
          <span className={isDark ? "text-white" : "text-gray-950/80"}>Hub</span>
        </Link>

       
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-1">{getNavLinks(false)}</ul>

          <div className="flex items-center space-x-4 border-l border-white/20 pl-6 dark:border-gray-800">
            <button
              onClick={toggleTheme}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all border ${
                isDark
                  ? "bg-gray-900 border-gray-700 text-yellow-400 hover:border-[#36e2c3]"
                  : "bg-white/10 border-white/20 text-white hover:bg-white/20"
              }`}>
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {!user ? (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-sm font-bold text-white hover:opacity-80">Login</Link>
                <Link
                  to="/register"
                  className={`px-5 py-2 rounded-xl text-sm font-black transition-all ${
                    isDark ? "bg-[#36e2c3] text-gray-950" : "bg-white text-blue-600 shadow-lg"
                  }`}
                >
                  Join
                </Link>
              </div>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>

                <img
                  src={user.photoURL || "https://via.placeholder.com/40"}
                  alt="user"
                  className={`w-10 h-10 rounded-full border-2 cursor-pointer object-cover ${
                    isDark ? "border-[#36e2c3]" : "border-white"
                  }`}/>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={`absolute right-0 mt-2 w-52 p-3 rounded-2xl border shadow-2xl z-20 ${
                        isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
                      }`}>

                      <p className="font-black text-xs uppercase tracking-widest text-gray-500 mb-3 px-2">Account</p>
                      <Link
                        to="/dashboard"
                        className="w-full block text-left px-3 py-2 mb-1 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 font-bold text-sm transition-colors">
                        Dashboard </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-red-500 font-bold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                        Sign Out </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </nav>


        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleTheme} className="text-white">
            {isDark ? <FiSun size={22} className="text-yellow-400" /> : <FiMoon size={22} />}
          </button>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2 bg-white/10 rounded-lg">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>


      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed inset-y-0 right-0 w-72 z-60 shadow-2xl p-6 ${
              isDark ? "bg-gray-950 border-l border-gray-800" : "bg-white"
            }`}>
              
            <div className="flex justify-between items-center mb-10">
              <span className={`font-black uppercase tracking-widest text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>Navigation</span>
              <button onClick={() => setIsOpen(false)} className={isDark ? "text-white" : "text-gray-950"}>
                <FiX size={24} />
              </button>
            </div>

            <ul className="space-y-4 mb-10">
              {getNavLinks(true)}
            </ul>

            <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
              {user ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 px-2 mb-4">
                    <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="" />
                    <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{user.displayName}</span>
                  </div>
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block w-full text-center py-3 bg-blue-600 text-white rounded-xl font-bold">Dashboard</Link>
                  <button onClick={handleLogout} className="w-full py-3 text-red-500 font-bold border border-red-100 dark:border-red-900/30 rounded-xl">Sign Out</button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center py-3 font-bold border rounded-xl dark:border-gray-800 dark:text-white">Login</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="text-center py-3 bg-blue-600 text-white rounded-xl font-bold">Join</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-55 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;