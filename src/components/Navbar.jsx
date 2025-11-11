// src/components/Navbar.jsx
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allJobs"
          className={({ isActive }) =>
            isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
          }
        >
          All Jobs
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink
              to="/addJob"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
              }
            >
              Add Job
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/myAddedJobs"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
              }
            >
              My Added Jobs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-accepted-tasks"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-semibold" : "hover:text-blue-400"
              }
            >
              My Accepted Tasks
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="navbar max-w-6xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Freelance<span className="text-gray-800">Hub</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          <ul className="flex space-x-6">{navLinks}</ul>

          {!user ? (
            <div className="flex space-x-3">
              <Link
                to="/login"
                className="px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* User Photo */}
              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
              />

              {/* Hover Card */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg p-3 w-40 border z-20"
                  >
                    <p className="font-semibold text-sm mb-2 text-center">
                      {user.displayName || "User"}
                    </p>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
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
        <div className="md:hidden">
          <details className="dropdown">
            <summary className="m-1 btn bg-blue-500 text-white border-none">
              Menu
            </summary>
            <ul className="p-2 shadow menu dropdown-content z-10 bg-white rounded-box w-52">
              {navLinks}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
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
