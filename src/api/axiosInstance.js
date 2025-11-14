import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://wbc-backend-13ki.onrender.com/api", // Replace with your backend API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ⭐ ENHANCEMENT: Request Interceptor for Authentication
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