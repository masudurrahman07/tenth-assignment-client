import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
// Import necessary icons
import { Mail, Lock, Check, User, Image, Eye, EyeOff, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { signUp, loginWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // --- Existing State & Logic ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    // Keep existing validation
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must include at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must include at least one lowercase letter");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, name, photoURL);
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  // --- New Design Implementation ---
  return (
    // Main background wrapper (Teal color with zigzag pattern simulation)
    <div className="min-h-screen w-full flex items-center justify-center bg-[#1cbba5] font-sans p-4 relative overflow-hidden">

      {/* Decorative background lines */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M0 20 L30 10 L70 40 L100 20" stroke="white" strokeWidth="0.5" fill="none" />
           <path d="M0 80 L40 60 L60 90 L100 70" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* The Register Card */}
      <div className="w-full max-w-[420px] bg-[#0b1a26] rounded-3xl p-8 md:p-10 shadow-2xl z-10 my-10">

        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="text-[10px] tracking-[0.3em] text-gray-500 uppercase mb-6">Enrollment</p>

          <div className="flex items-center justify-center gap-2 mb-8">
             <div className="w-8 h-4 border-2 border-[#36e2c3] rounded-sm relative">
                <div className="absolute -right-1 top-1 w-2 h-1 bg-[#36e2c3]"></div>
             </div>
             <h1 className="text-[#36e2c3] text-3xl font-bold tracking-tight">FreelanceHub</h1>
          </div>

          <h2 className="text-white text-2xl font-semibold mb-2">Create Account</h2>
          <p className="text-gray-400 text-sm leading-relaxed px-2">
            Sign up to start your freelancing journey.
          </p>
        </div>

        <form onSubmit={handleRegister} className="flex flex-col gap-3">
          {/* Full Name Input */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
          </div>

          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
          </div>

           {/* Photo URL Input (Optional) */}
           <div className="relative group">
            <Image className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="Photo URL (optional)"
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#36e2c3] transition-colors" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
              // Added extra padding right (pr-12) for the toggle button
              className="w-full bg-transparent border border-gray-700 rounded-lg py-4 pl-12 pr-12 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-all"
            />
             <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#36e2c3] transition-colors outline-none"
            >
                {/* Used Icons instead of text for better aesthetics */}
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 bg-[#36e2c3] hover:bg-[#2bc9ad] text-[#0b1a26] font-bold py-4 rounded-lg flex items-center justify-center gap-2 transition-all transform active:scale-95"
          >
            <Check size={20} />
            Register
          </button>
        </form>

        {/* Utility Section with Google & Login Link */}
        <div className="mt-8 flex flex-col gap-6 text-center">
            {/* Divider */}
            <div className="flex items-center gap-4 px-2">
                <div className="h-px flex-1 bg-gray-800"></div>
                <span className="text-[10px] uppercase tracking-widest text-gray-600 font-bold">Or register with</span>
                <div className="h-px flex-1 bg-gray-800"></div>
            </div>

            {/* Google Button */}
            <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center gap-3 w-full py-3 px-4 border border-gray-700 rounded-xl text-gray-300 hover:bg-[#162a3a] hover:border-gray-500 hover:text-white transition-all duration-300 text-sm font-medium shadow-sm"
            >
                <FcGoogle size={20} />
                Google
            </button>

            {/* Login Link */}
             <Link
                to="/login"
                className="group flex items-center justify-center gap-2 text-xs text-gray-500 hover:text-[#36e2c3] transition-colors mt-2"
            >
                <LogIn size={14} className="group-hover:translate-x-1 transition-transform" />
                <span>Already have an account? <span className="text-[#36e2c3] font-semibold">Login</span></span>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;