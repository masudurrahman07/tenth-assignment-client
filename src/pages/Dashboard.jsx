import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiLogOut, FiUser } from "react-icons/fi";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      
      {/* Dashboard Top Navbar */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl  font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL || "https://via.placeholder.com/40"}
            alt="user"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
          
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FiUser /> Profile Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                defaultValue={user?.displayName || ""}
                className="w-full mt-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-transparent"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="w-full mt-1 px-4 py-2 rounded-lg border dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700">
              Save Changes
            </button>

            <button
              onClick={logOut}
              className="px-6 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
