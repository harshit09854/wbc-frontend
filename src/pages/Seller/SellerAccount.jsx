import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Menu, X } from "lucide-react";

// Simple Modal component
const Modal = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">{title}</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
      >
        Get Started
      </button>
    </div>
  </div>
);

const SellerAccount = () => {
  const { user, updateUser, logout } = useAuth();
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
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

  // Dummy data (same as before)
  const dashboardData = {
    totalProducts: 0, // Will be updated dynamically
    monthlySales: "₹12,500",
    pendingOrders: 5,
  };

  const orders = [
    {
      id: "ORD001",
      customer: "Priya Sharma",
      product: "Handmade Earrings",
      amount: "₹499",
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Anjali Patel",
      product: "Silk Saree",
      amount: "₹2,999",
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Meera Reddy",
      product: "Designer Handbag",
      amount: "₹1,799",
      status: "Delivered",
    },
  ];

  const payments = {
    currentBalance: "₹5,000",
    lastPayout: "20 Oct 2025",
    pendingAmount: "₹2,500",
  };

  const messages = [
    {
      id: 1,
      from: "Customer Support",
      subject: "Welcome to Seller Panel!",
      date: "2025-01-15",
    },
    {
      id: 2,
      from: "Buyer Query",
      subject: "Product Size Information",
      date: "2025-01-14",
    },
  ];

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/products/my-products",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      } else {
        console.error("Failed to fetch products");
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch products when component mounts or when activeSection changes to products
  useEffect(() => {
    if (activeSection === "products") {
      fetchProducts();
    }
  }, [activeSection]);

  // Update dashboard data with actual product count
  useEffect(() => {
    dashboardData.totalProducts = products.length;
  }, [products]);

  // Populate profile form data when user data changes
  useEffect(() => {
    if (activeSection === "profile" && user) {
      setProfileFormData({
        shopName: user.businessName || "",
        email: user.email || "",
        yearsInBusiness: user.yearsInBusiness || "",
        businessAddress: user.address || "",
        businessType: user.businessType || "",
        description: user.description || "",
        pinCode: user.pinCode || "",
      });
    }
  }, [activeSection, user]);

  useEffect(() => {
    if (location.state?.fromRegistration) {
      setShowSuccessModal(true);
    }

    // Also fetch products if coming from add-product with success
    if (location.state?.fromAddProduct) {
      fetchProducts();
    }
  }, [location.state]);

  // Handle changes in profile form fields
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileFormData),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the user globally and refresh localStorage
        updateUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));

        console.log("✅ Profile updated successfully:", data.user);
        setShowUpdateModal(true);
      } else {
        console.error("❌ Failed to update profile:", data.message);
        setShowUpdateModal(true);
      }
    } catch (error) {
      console.error("⚠️ Error while updating profile:", error);
      setShowUpdateModal(true);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        // Remove product from local state
        setProducts(products.filter((product) => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  // ----- Render Sections -----
  const renderDashboard = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.totalProducts}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Monthly Sales</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.monthlySales}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.pendingOrders}
          </p>
        </div>
      </div>
    </section>
  );

  const renderProducts = () => {
    // Read products from localStorage for demo
    const demoProducts = JSON.parse(
      localStorage.getItem("demoProducts") || "[]"
    );

    return (
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🛍️ My Products</h2>

        {demoProducts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow">
            <p className="text-gray-500 mb-4">No products found.</p>
            <button
              onClick={() => navigate("/add-product")}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              + Add Your First Product
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Category</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demoProducts.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-4 py-2">{product.name}</td>
                      <td className="px-4 py-2">₹{product.price}</td>
                      <td className="px-4 py-2">{product.stock}</td>
                      <td className="px-4 py-2 capitalize">
                        {product.category}
                      </td>
                      <td
                        className={`px-4 py-2 ${
                          product.stock > 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {product.stock > 0 ? "Active" : "Out of Stock"}
                      </td>
                      <td className="px-4 py-2 space-x-2">
                        <button
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => {
                            // Remove from localStorage
                            const updatedProducts = demoProducts.filter(
                              (p) => p.id !== product.id
                            );
                            localStorage.setItem(
                              "demoProducts",
                              JSON.stringify(updatedProducts)
                            );
                            // Refresh the component by updating state or reloading
                            window.location.reload(); // Simple solution for demo
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              onClick={() => navigate("/add-product")}
              className="mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              + Add New Product
            </button>
          </>
        )}
      </section>
    );
  };

  // Add this function to handle edit
  const handleEditProduct = (product) => {
    navigate("/add-product", {
      state: {
        editMode: true,
        product: product,
      },
    });
  };

  const renderOrders = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📦 Orders</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const renderPayments = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💰 Payments</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Current Balance:</span>
          <span className="text-2xl font-bold text-green-600">
            {payments.currentBalance}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Pending Amount:</span>
          <span className="text-xl font-semibold text-yellow-600">
            {payments.pendingAmount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Last Payout:</span>
          <span className="text-gray-600">{payments.lastPayout}</span>
        </div>
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
          Request Payout
        </button>
      </div>
    </section>
  );

  const renderSupport = () => (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💬 Messages / Support</h2>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Your Messages</h3>
        </div>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{message.from}</h4>
                  <p className="text-gray-600">{message.subject}</p>
                </div>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );

  // Profile section
  const renderProfile = () => (
    <section>
      <h2 className="text-2xl font-semibold mb-4">👤 Profile</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                value={profileFormData.shopName}
                onChange={handleProfileInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                value={profileFormData.email}
                onChange={handleProfileInputChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience in Business
          </label>
          <select
            name="yearsInBusiness"
            value={profileFormData.yearsInBusiness}
            onChange={handleProfileInputChange}
            className="w-50 px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Experience</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                name="businessAddress"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={profileFormData.businessAddress}
                onChange={handleProfileInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="businessType"
                value={profileFormData.businessType}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="food">Food & Beverages</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="handicrafts">Handicrafts</option>
                <option value="beauty">Beauty & Wellness</option>
                <option value="home">Home & Living</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={profileFormData.description}
                onChange={handleProfileInputChange}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleProfileSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Save Changes
        </button>
      </div>
    </section>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "products":
        return renderProducts();
      case "orders":
        return renderOrders();
      case "payments":
        return renderPayments();
      case "support":
        return renderSupport();
      case "profile":
        return renderProfile();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 flex">
      {/* Sidebar for desktop */}
      <aside
        className={`fixed md:relative left-0 w-64 bg-white shadow-md p-6 h-250 transform transition-transform duration-300 ease-in-out z-20
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0`}
      >
        <h2 className="text-xl font-bold text-purple-700 mb-6 text-center">
          Seller Panel
        </h2>
        <nav className="space-y-2">
          {[
            ["dashboard", "📊 Dashboard"],
            ["products", "🛍️ My Products"],
            ["orders", "📦 Orders"],
            ["payments", "💰 Payments"],
            ["support", "💬 Support"],
            ["profile", "👤 Profile"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setActiveSection(key);
                setSidebarOpen(false);
              }}
              className={`block w-full text-left px-3 py-2 rounded-md font-medium transition ${
                activeSection === key
                  ? "bg-purple-100 text-purple-700"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </aside>

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
