import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Zap, Clock } from "lucide-react";

const Upgrade = () => {
  const [isVisible, setIsVisible] = useState(true);


  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 14,
    minutes: 38,
    seconds: 43,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const TimeUnit = ({ value }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 backdrop-blur-md text-white w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl shadow-inner font-black text-lg md:text-xl border border-white/10">
        {value.toString().padStart(2, '0')}
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg overflow-hidden">
    
          <div className="bg-linear-to-br from-blue-900 via-[#1a1c2e] to-[#2d1b4e] rounded-4xl p-8 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            
      
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#36e2c3]/10 rounded-full blur-[80px]"></div>

      
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-6 right-6 bg-white/5 hover:bg-white/10 text-white p-2 rounded-full transition-all border border-white/10 group z-10">
              <X size={20} className="group-hover:rotate-90 transition-transform" />
            </button>

       
            <div className="text-center space-y-6 relative z-10">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#36e2c3] flex items-center justify-center gap-2">
                  <Zap size={14} className="fill-current" /> Premium Upgrade </p>
                <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                  50% <span className="text-[#36e2c3]">OFF</span>
                </h2>
              </div>

              <p className="text-gray-300 font-medium text-sm md:text-base max-w-[280px] mx-auto leading-tight">
                Limited time offer: Unlock <span className="text-white font-bold">Pro Hub</span> features for half the price.
              </p>

       
              <div className="flex items-center justify-center gap-2 py-4">
                <TimeUnit value={timeLeft.days} />
                <span className="font-black text-[#36e2c3] text-xl opacity-50">:</span>
                <TimeUnit value={timeLeft.hours} />
                <span className="font-black text-[#36e2c3] text-xl opacity-50">:</span>
                <TimeUnit value={timeLeft.minutes} />
                <span className="font-black text-[#36e2c3] text-xl opacity-50">:</span>
                <TimeUnit value={timeLeft.seconds} />
              </div>


              <div className="space-y-3 text-left max-w-[320px] mx-auto pt-2">
                {[
                  "Priority status on all job applications",
                  "Verified 'Top Talent' badge on profile",
                  "Detailed AI-powered analytics dashboard",
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="bg-[#36e2c3]/20 p-1 rounded-full">
                       <Check size={14} strokeWidth={4} className="text-[#36e2c3]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-200 leading-none">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

      
              <div className="pt-4">
                <h4 className="text-xl md:text-2xl font-black text-white flex items-center justify-center gap-2">
                  Upgrade for <span className="line-through text-gray-500 text-lg">€156</span> <span className="text-[#36e2c3]">€78/year</span>
                </h4>
              </div>

          
              <div className="flex flex-col gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-linear-to-r from-[#36e2c3] to-emerald-500 text-gray-950 font-black py-4 rounded-2xl shadow-xl shadow-[#36e2c3]/20 hover:shadow-[#36e2c3]/40 transition-all text-lg tracking-tight">
                  Claim My Discount
                </motion.button>
                <button 
                  onClick={() => setIsVisible(false)}
                  className="text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                  Maybe Later </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Upgrade;