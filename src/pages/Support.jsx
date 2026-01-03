import React from "react";
import { motion } from "framer-motion";
import {  Zap } from "lucide-react";

import { 
  Search, 
  UserCircle, 
  CreditCard, 
  Mail, 
  ShieldCheck, 
  SearchCode, 
  Briefcase, 
  Hammer, 
  LifeBuoy, 
  AlertCircle, 
  Settings, 
  BookOpen 
} from "lucide-react";

const Support = () => {
  const categories = [
    {
      title: "Account Support",
      links: [
        { icon: <UserCircle size={16} />, label: "Profile Management" },
        { icon: <CreditCard size={16} />, label: "Billing & Invoices" },
        { icon: <Mail size={16} />, label: "Email Verification" },
        { icon: <ShieldCheck size={16} />, label: "Security & 2FA" },
      ],
    },
    {
      title: "Hiring on FreelanceHub",
      links: [
        { icon: <SearchCode size={16} />, label: "Talent Search" },
        { icon: <Briefcase size={16} />, label: "Posting a Job" },
        { icon: <Hammer size={16} />, label: "Project Management" },
        { icon: <BookOpen size={16} />, label: "Hiring Basics" },
      ],
    },
    {
      title: "For Freelancers",
      links: [
        { icon: <Settings size={16} />, label: "Setting up Shop" },
        { icon: <Zap size={16} />, label: "Hub Pro Benefits" },
        { icon: <LifeBuoy size={16} />, label: "Workshops" },
        { icon: <AlertCircle size={16} />, label: "Exposure & SEO" },
      ],
    },
    {
      title: "About FreelanceHub",
      links: [
        { icon: <AlertCircle size={16} />, label: "Trust & Safety" },
        { icon: <Settings size={16} />, label: "Integrations & APIs" },
        { icon: <BookOpen size={16} />, label: "Hub Basics" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        
    
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-2">
              Help Center
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              Search our knowledge base or browse categories below.
            </p>
          </motion.div>

        
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative group max-w-3xl">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
            </div>
            <input
              type="text"
              placeholder="Start your search..."
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl py-4 pl-12 pr-4 text-gray-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-[#36e2c3] outline-none transition-all shadow-sm"
            />
          </motion.div>
        </header>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {categories.map((category, idx) => (
            <motion.section 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 dark:border-gray-800">
                {category.title}
              </h3>
              
              <ul className="space-y-4">
                {category.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-[#36e2c3] transition-colors group">
                      <span className="p-1.5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 group-hover:border-blue-200 dark:group-hover:border-[#36e2c3]/30 transition-all">
                        {link.icon}
                      </span>
                      <span className="font-semibold text-sm tracking-tight">{link.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.section>
          ))}
        </div>

 
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-24 p-1 rounded-3xl bg-linear-to-r from-blue-700 via-sky-600 to-blue-500 dark:from-[#36e2c3] dark:to-emerald-500">
          <div className="bg-white dark:bg-gray-950 rounded-[22px] p-8 md:p-12 text-center">
            <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4"> Still need help?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Our support team is available 24/7 to help you with any issues or questions you might have.</p>
            <button className="px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-xl hover:scale-105 transition-transform active:scale-95 shadow-xl">
              Contact Support</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;