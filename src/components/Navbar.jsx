import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleLogout = () => {
    logOut()
      .then(() => toast.success("Logged out successfully"))
      .catch(() => toast.error("Logout failed"));};

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);}, 
    [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");};

  const isDark = theme === "dark";

  const navLinks = (
    <>
      {/* toggle theme */}
      <li>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            checked={isDark}
            className="toggle"/>

          <span
            className={`text-sm ${isDark ? "text-gray-200" : "text-gray-800"}`}>
            {isDark ? "Dark" : "Light"}
          </span>

        </label>
      </li>

      <li>
        <NavLink
          to="/" className={({ isActive }) =>
            isActive ? "text-blue-400 font-semibold"
              : `${isDark  ? "text-gray-200 hover:text-blue-400"
                    : "text-gray-800 hover:text-blue-500"
                }`}>Home</NavLink>
      </li>

      <li>

        <NavLink to="/allJobs"
          className={({ isActive }) =>
            isActive  ? "text-blue-400 font-semibold"
              : `${isDark? "text-gray-200 hover:text-blue-400"
                    : "text-gray-800 hover:text-blue-500"}`}>All Jobs</NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/addJob" className={({ isActive }) =>  isActive
                  ? "text-blue-400 font-semibold"
                  : `${ isDark  ? "text-gray-200 hover:text-blue-400"
                        : "text-gray-800 hover:text-blue-500"}`}>
              Add Job
            </NavLink>
          </li>
          <li>

            <NavLink
              to="/myAddedJobs"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : `${
                      isDark  ? "text-gray-200 hover:text-blue-400"
                        : "text-gray-800 hover:text-blue-500"}`}>My Added Jobs </NavLink>
          </li>

          <li>
            <NavLink
              to="/my-accepted-tasks"  className={({ isActive }) =>  isActive  ? "text-blue-400 font-semibold"
                  : `${  isDark  ? "text-gray-200 hover:text-blue-400"
                        : "text-gray-800 hover:text-blue-500"
                    }`}> My Accepted Tasks
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <header
      className={`sticky top-0 z-50 shadow-md transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800" }`}>

      <div className="navbar max-w-6xl mx-auto flex justify-between items-center p-4">
        
        <Link
          to="/"
          className={`text-2xl font-bold transition ${ isDark  ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
             }`}>Freelance
          <span className={isDark ? "text-gray-200" : "text-gray-800"}>  Hub  </span>
        </Link>

        {/* desktop menu here */}
        <nav className="hidden md:flex space-x-6 items-center">
          <ul className="flex space-x-6">{navLinks}</ul>

          {!user ? (
            <div className="flex space-x-3">
              <Link
                to="/login"  className={`px-3 py-1 border rounded transition ${  isDark  ? "border-blue-400 text-blue-400 hover:bg-blue-500 hover:text-white"
                    : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                }`}>  Login  </Link>

              <Link  to="/register"  className={`px-3 py-1 rounded transition ${  isDark
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"}`}>Register </Link>
            </div>
          ) : (
            <div
              className="relative flex flex-col items-center"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}>

              <img
                src={user.photoURL}
                alt="user"
                className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"/>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 rounded-lg shadow-lg p-3 w-40 border z-20 ${
                      isDark
                        ? "bg-gray-800 text-gray-100 border-gray-700"
                        : "bg-white text-gray-800 border-gray-200"}`}>

                    <p className="font-semibold text-sm mb-2 text-center">{user.displayName || "User"}</p>

                    <button  onClick={handleLogout}  className={`w-full py-1 rounded transition ${
                        isDark  ? "bg-blue-600 text-white hover:bg-blue-500"
                          : "bg-blue-500 text-white hover:bg-blue-600"}`}>Logout </button>
                  </motion.div>)}

              </AnimatePresence>
            </div> )}
        </nav>

        {/* mobile menu */}
        <div className="md:hidden">
          <details className="dropdown">

            <summary  className={`m-1 btn border-none ${
                isDark  ? "bg-blue-600 text-white hover:bg-blue-500"
                  : "bg-blue-500 text-white hover:bg-blue-600"}`}>Menu
            </summary>

            <ul
              className={`p-2 shadow menu dropdown-content z-10 rounded-box w-52 ${
                isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"}`}>

              {navLinks}
              {user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:text-red-600"> Logout</button> </li>
              ) : (
                <>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>)}

            </ul>

          </details>

        </div>
      </div>

    </header>
  );
};

export default Navbar;
