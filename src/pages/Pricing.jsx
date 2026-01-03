import React from "react";
import { motion } from "framer-motion";
import { Check, HelpCircle, Zap, Shield, Crown } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Core",
      price: "$0",
      description: "Perfect for new freelancers getting started.",
      features: [
        "Collaborative, AI-powered project tools",
        "Personalized, adaptive job matching",
        "Basic project boards and task tracking",
        "Automated basic analytics",
        "Standard community support",
      ],
      buttonText: "Get started",
      isPremium: false,
    },
    {
      name: "Pro Hub",
      price: "$29",
      description: "For professionals ready to scale their business.",
      features: [
        "Everything in Core, plus:",
        "Priority job application status",
        "Advanced API access for custom tools",
        "User provisioning (SCIM) for teams",
        "Custom HR system connectors",
      ],
      buttonText: "Start Pro Trial",
      isPremium: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-20 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16 space-y-6">
          {" "}
   
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.15] tracking-tight"
          >
            Flexible Plans for 
            <span className="bg-linear-to-r from-blue-600 to-[#36e2c3] bg-clip-text text-transparent inline-block">
              Every Talent.</span>
          </motion.h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Scale your freelance career with powerful infrastructure and secure
            project management.</p>
        </div>

    
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full border transition-all duration-300 ${
                plan.isPremium
                  ? "bg-gray-950 border-gray-800 text-white shadow-2xl"
                  : "bg-white border-gray-100 text-gray-900 shadow-xl shadow-gray-200/50"
              }`}>
              {plan.isPremium && (
                <div className="absolute top-0 right-10 -translate-y-1/2">
                  <span className="bg-linear-to-r from-blue-600 to-[#36e2c3] text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                    Most Popular</span>
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span
                    className={`text-sm ${
                      plan.isPremium ? "text-gray-400" : "text-gray-500"
                    }`}>
                    {plan.price === "$0" ? "forever" : "/ per month"}
                  </span>
                </div>
                <p
                  className={`text-sm ${
                    plan.isPremium ? "text-gray-400" : "text-gray-500"
                  } leading-relaxed`}>
                  {plan.description}
                </p>
              </div>

              <div className="space-y-5 grow mb-10">
                <p
                  className={`text-[10px] font-black uppercase tracking-widest ${
                    plan.isPremium ? "text-gray-500" : "text-gray-400"
                  }`}
                >
                  The end-to-end platform, including:
                </p>
                {plan.features.map((feature, fIndex) => (
                  <div
                    key={fIndex}
                    className="flex items-start justify-between group cursor-help">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-1 rounded-full ${
                          plan.isPremium ? "bg-green-500/20" : "bg-green-100"
                        }`}>
                        <Check
                          className="text-green-500"
                          size={14}
                          strokeWidth={3}
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          plan.isPremium ? "text-gray-300" : "text-gray-700"
                        }`}>
                        {feature}
                      </span>
                    </div>
                    <HelpCircle
                      size={16}
                      className={`${
                        plan.isPremium ? "text-gray-600" : "text-gray-300"
                      } group-hover:text-blue-500 transition-colors`}/>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg ${
                  plan.isPremium
                    ? "bg-white text-gray-950 hover:bg-gray-100"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20"
                }`}>
                {plan.buttonText}
              </motion.button>
            </motion.div>
          ))}
        </div>


        <div className="text-center space-y-8">
          <div className="flex justify-center items-center gap-4 opacity-70">
            <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <Shield className="text-gray-400 dark:text-gray-500" />
            </div>
            <div className="p-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <Crown className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-loose">
            ISO 27001 certified and GDPR compliant. Data encrypted at{" "}
            <br className="hidden md:block" />
            rest with AES 256 and in transit with TLS 1.2+.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
