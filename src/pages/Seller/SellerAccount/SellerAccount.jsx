import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { Menu, X } from "lucide-react";
import axiosInstance from "../../../api/axiosInstance";
// Import components
import Modal from "./Modal";
import Sidebar from "./Sidebar";
import DashboardSection from "./DashboardSection";
import ProductsSection from "./ProductsSection"; // Make sure this path is correct
import OrdersSection from "./OrdersSection";
import PaymentsSection from "./PaymentsSection";
import SupportSection from "./SupportSection";
import ProfileSection from "./ProfileSection";

const SellerAccount = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [loading, setLoading] = useState(false); // <-- Already have this, good!
  const location = useLocation();
  const navigate = useNavigate();

  // State for profile form fields
  const [profileFormData, setProfileFormData] = useState({
    shopName: "",
    email: "",
    yearsInBusiness: "",
    businessAddress: "",
    businessType: "",
    description: "",
    pinCode: "",
  });

  // Dashboard data (this will update automatically when 'products' state changes)
  const dashboardData = {
    totalProducts: products.length,
    monthlySales: "null", // You'll fetch this later
    pendingOrders: "null", // You'll fetch this later
  };

  // ✅ **FIX 1: Implement fetchProducts correctly**
  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      const response = await axiosInstance.get("/seller/products", {
        headers: {
          // Pass the token in the Authorization header
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Set to empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts or when activeSection changes to products
  useEffect(() => {
    if (activeSection === "products") fetchProducts();
  }, [activeSection]);

  // Populate profile form data when user data changes
  useEffect(() => {
    // This can be populated from your auth context or an API call
  }, [activeSection, user]);

  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowSuccessModal(true);
    }

    if (location.state?.fromAddProduct) {
      fetchProducts();
    }
  }, [location.state]);

  // ... (handleProfileInputChange, handleLogout, handleProfileSubmit are unchanged) ...
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    // ... (your existing submit logic) ...
  };

  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection dashboardData={dashboardData} />;
      case "products":
        // ✅ **FIX 2: Pass props to ProductsSection**
        return <ProductsSection products={products} loading={loading} />;
      case "orders":
        return <OrdersSection />;
      case "payments":
        return <PaymentsSection />;
      case "support":
        return <SupportSection />;
      case "profile":
        return (
          <ProfileSection
            profileFormData={profileFormData}
            handleProfileInputChange={handleProfileInputChange}
            handleProfileSubmit={handleProfileSubmit}
          />
        );
      default:
        return <DashboardSection dashboardData={dashboardData} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  flex">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Hamburger Button for mobile */}
      <button
        className="md:hidden fixed top-24 left-4 z-30 bg-purple-600 text-white p-2 rounded-md shadow"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main Content */}
      <main className="flex-1 p-20 transition-all duration-300">
        {renderActiveSection()}
      </main>

      {/* Modals */}
      {showSuccessModal && (
        <Modal
          title="🎉 CONGRATULATIONS! 🎉"
          message="Your Seller Account has been successfully created. Welcome to the community!"
          onClose={() => {
            setShowSuccessModal(false);
          }}
        />
      )}

      {showUpdateModal && (
        <Modal
          title="✅ Profile Updated"
          message="Your profile information has been successfully saved."
          onClose={() => setShowUpdateModal(false)}
        />
      )}
    </div>
  );
};

export default SellerAccount;
