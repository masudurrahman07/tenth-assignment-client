import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login, loginWithGoogle } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // toggle

  const location = useLocation();
  const navigate = useNavigate();

  // Get the intended route or default to home
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Logged in successfully!");
      navigate(from, { replace: true }); // Redirect to intended page
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Logged in with Google!");
      navigate(from, { replace: true }); // Redirect to intended page
    } catch (err) {
      console.error(err);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
          className="border px-3 py-2 rounded"
        />

        {/* Password Field with Show/Hide */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
            className="border px-3 py-2 rounded w-full"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-2 text-sm text-gray-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleGoogleLogin}
        className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Login with Google
      </button>

      <p className="mt-4 text-sm text-center">
        Forgot your password?{" "}
        <Link to="" className="text-blue-500 hover:underline">
          Reset here
        </Link>
      </p>

      <p className="mt-2 text-sm text-center">
        Don't have an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
