import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getAuth, updateProfile } from "firebase/auth"; // Fix: import getAuth
import { toast } from "react-toastify";
import { FiLogOut, FiUser, FiMail, FiEdit3, FiLoader, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateProfile = async () => {
    if (!displayName) {
      toast.error("Name cannot be empty");
      return;
    }

    // Access the direct Firebase Auth instance to avoid "getIdToken" errors
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      toast.error("Session expired. Please log in again.");
      return;
    }

    setIsUpdating(true);
    try {
      await updateProfile(currentUser, {
        displayName: displayName,
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Update Error:", error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Dashboard Top Navbar */}
      <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-8 bg-linear-to-b from-blue-700 to-sky-500 dark:from-[#36e2c3] dark:to-emerald-500 rounded-full"></div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            User Dashboard
          </h1>
        </div>

      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 overflow-hidden"
        >
          {/* Header Accent Line */}
          <div className="h-1.5 w-full bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 dark:from-[#36e2c3] dark:via-[#2bc9ad] dark:to-[#36e2c3]"></div>
          
          <div className="p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <FiUser className="text-blue-600 dark:text-[#36e2c3]" /> 
                Account Settings
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
                Update your personal information and profile visibility.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                  <FiEdit3 size={12} /> Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-[#36e2c3] outline-none transition-all font-medium"
                  />
                  {user?.displayName === displayName && displayName !== "" && (
                    <FiCheckCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" />
                  )}
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-gray-400 dark:text-gray-500 flex items-center gap-2">
                  <FiMail size={12} /> Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
              
              <button 
                onClick={handleUpdateProfile}
                disabled={isUpdating}
                className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 dark:from-[#36e2c3] dark:via-[#2bc9ad] dark:to-[#36e2c3] text-white dark:text-gray-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-blue-500/20 dark:shadow-[#36e2c3]/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isUpdating ? (
                  <>
                    <FiLoader className="animate-spin" /> Updating...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                onClick={logOut}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-linear-to-r from-red-50 to-rose-100 dark:from-red-950/20 dark:to-rose-900/20 border border-red-200/50 dark:border-red-800/30 text-red-600 dark:text-red-400 font-bold hover:from-red-100 hover:to-rose-200 dark:hover:from-red-900/40 dark:hover:to-rose-800/40 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <FiLogOut /> Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;