import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";


const Register = () => {
  const { signUp, loginWithGoogle } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
   const [showPassword, setShowPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
 

  const handleRegister = async (e) => {
    e.preventDefault();

    
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
    } 
    catch (err) {
      toast.error(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await loginWithGoogle();
      toast.success("Google login successful!");
      navigate("/");
    } 
    catch (err) {
      toast.error(err.message);
    } 
    finally {
      setLoading(false);
    }
  };


  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-md mx-auto p-6  mt-10 border rounded shadow">

      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Full Name"
          className="border px-3 py-2 rounded"/>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="border px-3 py-2 rounded"/>

        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          placeholder="Photo URL (optional)"
          className="border px-3 py-2 rounded"/>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="border px-3 py-2 rounded w-full"/>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2  text-gray-500 text-sm">
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">
          Register </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition">
        Register with Google </button>

      <p className="mt-4  text-center text-sm">Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login</Link>
      </p>
    </div>
  );
};

export default Register;
