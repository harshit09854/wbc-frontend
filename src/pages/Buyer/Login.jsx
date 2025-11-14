// Import necessary modules and hooks
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.png";

// Login component
const Login = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { login } = useAuth(); // Custom context hook to handle login logic

  // State for form data, error messages, and loading status
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes and clear error on typing
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Send login request to backend
      const response = await axios.post(
        "https://wbc-backend-13ki.onrender.com/api/buyer/login",
        data
      );

      // If token is received, log in and redirect
      if (response.data.token) {
        login(
          {
            name: response.data.name,
            email: data.email,
            role: response.data.role,
            ...response.data.user, // Include additional user data
          },
          response.data.token
        );
        navigate("/"); // Redirect after login
      } else {
        setError("Login successful but no token received");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // JSX for login form UI
  return (
    <div className="min-h-screen bg-linear-to-b from-[#F8F0FF] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-auto">
      <div className="max-w-md w-full bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="p-8">
          {/* Logo Section */}
          <div className="flex justify-center mb-4 mt-2">
            <img src={logo} alt="WBC Logo" className="h-14 w-auto" />
          </div>

          {/* Welcome Text */}
          <div className="mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-1">
                Welcome Back
              </h2>
              <p className="text-[#7F7F7F] text-sm">
                Sign in to your account to continue
              </p>
            </div>

            {/* Login Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#2E2E2E] mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#2E2E2E] mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 text-[#6A0DAD] focus:ring-[#6A0DAD] border-[#E8E8E8] rounded"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-[#2E2E2E]"
                  >
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-[#6A0DAD] hover:text-[#B24592] text-sm font-medium transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="shrink-0">
                      <svg
                        className="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white py-3 rounded-lg font-medium bg-linear-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300 hover:shadow-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>

              {/* Signup Link */}
              <p className="mt-4 text-center text-sm text-[#7F7F7F]">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-[#6A0DAD] hover:text-[#B24592] font-medium transition-colors duration-300"
                >
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
