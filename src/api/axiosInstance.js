import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://wbc-backend-13ki.onrender.com/api", // Replace with your backend API base URL
  baseURL: "http://localhost:5000/api", // Local development URL
  headers: {
    "Content-Type": "application/json",
  },
});

//Request Interceptor for Authentication(JWT Token)
// This will attach the token to every request if it exists in localStorage.
// interceptor ensures that dynamic authentication tokens are always attached without repeating code.
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");

    // If a token exists, add it to the Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
