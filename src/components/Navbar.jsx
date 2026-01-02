import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { FiMoon, FiSun } from "react-icons/fi";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
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

  const navLinks = (
    <>
      {[
        { name: "Home", path: "/" },
        { name: "All Jobs", path: "/allJobs" },
        !user && { name: "Features", path: "/features" }, // Features only when logged out
        { name: "Add Job", path: "/addJob", auth: true },
        { name: "My Added Jobs", path: "/myAddedJobs", auth: true },
        { name: "My Accepted Tasks", path: "/my-accepted-tasks", auth: true },
      ]
        .filter(Boolean) // remove null / false entries
        .map((link) => {
          if (link.auth && !user) return null;
          return (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold text-white px-3 py-1 rounded-lg bg-linear-to-r from-green-400 via-green-500 to-green-600 transition-all duration-200"
                    : `px-3 py-1 rounded-lg transition-all duration-200 ${
                        isDark
                          ? "text-gray-200 hover:text-white hover:bg-gray-800"
                          : "text-white/90 hover:text-white hover:bg-white/10"
                      }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          );
        })}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDark
          ? "bg-gray-950 border-b border-gray-800 text-gray-100"
          : "bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 text-white"
      }`}
    >
      <div className="navbar max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold flex items-center transition-transform hover:scale-105"
        >
          <span className={isDark ? "text-[#36e2c3]" : "text-white"}>Freelance</span>
          <span className={isDark ? "text-white" : "text-black/80"}>Hub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex items-center space-x-2">{navLinks}</ul>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 border ${
              isDark
                ? "bg-gray-900 border-gray-700 text-yellow-400 hover:bg-gray-800"
                : "bg-white/10 border-white/20 text-white hover:bg-white/20"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {!user ? (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className={`px-4 py-1.5 border rounded-lg font-medium transition-all ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                    : "border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-1.5 rounded-lg font-medium transition-all shadow-sm ${
                  isDark
                    ? "bg-[#36e2c3] text-gray-950 hover:bg-[#2bc9ad]"
                    : "bg-white text-blue-600 hover:bg-gray-100"
                }`}
              >
                Register
              </Link>
            </div>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="user"
                className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-all ${
                  isDark ? "border-[#36e2c3]" : "border-white"
                }`}
              />

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={`absolute right-0 mt-2 w-48 p-4 rounded-xl border shadow-2xl z-20 ${
                      isDark
                        ? "bg-gray-900 text-white border-gray-800"
                        : "bg-white text-gray-800 border-gray-100"
                    }`}
                  >
                    <p className="font-bold text-sm mb-3 truncate px-1">
                      {user.displayName || "User"}
                    </p>

                    {/* Dashboard Button */}
                    <Link
                      to="/dashboard"
                      className="w-full block text-center py-2 mb-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    >
                      Dashboard
                    </Link>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="w-full py-2 rounded-lg bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border ${
              isDark ? "bg-gray-900 border-gray-700 text-yellow-400" : "bg-white/10 border-white/20 text-white"
            }`}
          >
            {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <details className="dropdown dropdown-end">
            <summary
              className={`btn btn-sm h-10 border-none px-4 ${
                isDark ? "bg-gray-800 text-white" : "bg-white/20 text-white"
              }`}
            >
              Menu
            </summary>
            <ul
              className={`p-4 shadow-2xl menu dropdown-content z-50 rounded-xl w-64 mt-4 ${
                isDark
                  ? "bg-gray-950 border border-gray-800 text-gray-100"
                  : "bg-white text-gray-800 border border-gray-100"
              }`}
            >
              {navLinks}
              <hr className="my-2 border-gray-200 dark:border-gray-800" />
              {user ? (
                <>
                  <li>
                    <Link
                      to="/dashboard"
                      className="block w-full text-center py-2 mb-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-center py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:bg-gray-100 dark:hover:bg-gray-800">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </details>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
