// Import necessary hooks and modules
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import logo from "../../assets/logo.png";

// Signup component
const Signup = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically
  const { login } = useAuth(); // Custom context hook to handle login after signup

  // Form state for user input
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Error and loading state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes and clear error
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      // Send signup request to backend
      const response = await axios.post(
        "https://wbc-backend-13ki.onrender.com/api/buyer/signup",
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );

      // If token is received, log in and r edirect
      if (response.data.token) {
        login(response.data.token, {
          name: data.name,
          email: data.email,
          role: "buyer",
        });
        navigate("/"); // Redirect to homepage or dashboard
      } else {
        setError("Signup successful but no token received");
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false); // Stop loading spinner
    }
  };

  // JSX for signup form UI
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F0FF] to-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-auto">
      <div className="max-w-md w-full bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="p-8">
          {/* Form Header */}
          <div className="mb-6">
            {/* Logo */}
            <div className="flex justify-center mb-4 mt-2">
              <img src={logo} alt="WBC Logo" className="h-14 w-auto" />
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-[#2E2E2E] mb-1">
                Create Account
              </h2>
              <p className="text-[#7F7F7F] text-sm">
                Join our community to start shopping
              </p>
            </div>

            {/* Signup Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#2E2E2E] mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

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
                  value={data.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

              {/* Phone Input */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#2E2E2E] mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter mobile number"
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
                  value={data.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

              {/* Confirm Password Input */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-[#2E2E2E] mb-1"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-2 border border-[#E8E8E8] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6A0DAD] focus:border-transparent bg-[#F8F0FF]"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
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
                className={`w-full text-white py-3 rounded-lg font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300 hover:shadow-lg ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              {/* Link to Login */}
              <p className="mt-4 text-center text-sm text-[#7F7F7F]">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-[#6A0DAD] hover:text-[#B24592] font-medium transition-colors duration-300"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
