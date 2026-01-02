import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { Mail, Lock, Check } from "lucide-react"; 
import { FcGoogle } from "react-icons/fc"; 
import { UserPlus, KeyRound } from "lucide-react"; 
import LoadingSpinner from "../components/LoadingSpinner";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

 const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true); // 2. Start loading
  try {
    await login(email, password);
    toast.success("Logged in successfully!");
    navigate(from, { replace: true }); 
  } 
  catch (err) {
    console.error(err);
    toast.error("Login failed. Please try again.");
  } finally {
    setLoading(false); // 3. Stop loading
  }
};

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Google login failed.");
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    // Main background wrapper (Teal color with zigzag pattern simulation)
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1cbba5] font-sans p-4 relative overflow-hidden">
      
      {/* Decorative background lines (simulating the image design) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 20 L30 10 L70 40 L100 20" stroke="white" strokeWidth="0.5" fill="none" />
           <path d="M0 80 L40 60 L60 90 L100 70" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* The Login Card */}
      <div className="w-full max-w-[420px] bg-[#0b1a26] rounded-3xl p-10 shadow-2xl z-10">
        
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-8">Enrollment</p>
          
          <div className="flex items-center justify-center gap-2 mb-10">
             {/* Logo Section */}
             <div className="w-8 h-4 border-2 border-[#36e2c3] rounded-sm relative">
                <div className="absolute -right-1 top-1 w-2 h-1 bg-[#36e2c3]"></div>
             </div>
             <h1 className="text-[#36e2c3] text-3xl font-bold tracking-tight">FreelanceHub</h1>
          </div>

          <h2 className="text-white text-2xl font-semibold mb-2">Welcome!</h2>
          <p className="text-gray-400 text-sm leading-relaxed px-4">
            Enter your username and password to activate your account.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Mail"
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-[#36e2c3] hover:bg-[#2bc9ad] text-[#0b1a26] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Check size={20} />
            Login
          </button>
        </form>

        {/* Keeping original utility links, styled subtly to match */}
       <div className="mt-8 flex flex-col gap-6 text-center">
    
    {/* Visual Divider */}
    <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gray-800"></div>
        <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Or</span>
        <div className="h-px flex-1 bg-gray-800"></div>
    </div>

    {/* Enhanced Google Login Button */}
    <button 
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-700 rounded-xl text-gray-300 hover:bg-[#162a3a] hover:border-gray-500 hover:text-white transition-all duration-300 text-sm font-medium shadow-sm"
    >
        <FcGoogle size={20} />
        Sign in with Google
    </button>

    {/* Footer Links with Icons */}
    <div className="flex flex-col gap-4 mt-2">
        <Link 
            to="/register" 
            className="group flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#36e2c3] transition-colors"
        >
            <UserPlus size={14} className="group-hover:scale-110 transition-transform" />
            <span>Don't have an account? <span className="text-[#36e2c3] font-semibold">Register</span></span>
        </Link>

        <Link 
            to="/forgot-password" 
            className="group flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-white transition-colors"
        >
            <KeyRound size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Forgot your password?</span>
        </Link>
    </div>
</div>
      </div>
    </div>
  );
};

export default Login;