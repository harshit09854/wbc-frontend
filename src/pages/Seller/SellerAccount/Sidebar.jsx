import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import Modal from "./Modal";

const Sidebar = ({
  activeSection,
  setActiveSection,
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    ["dashboard", "📊 Dashboard"],
    ["products", "🛍️ My Products"],
    ["orders", "📦 Orders"],
    ["payments", "💰 Payments"],
    ["support", "💬 Support"],
    ["profile", "👤 Profile"],
  ];

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
    setSidebarOpen(false);
  };

  return (
    <>
      <aside
        className={`fixed md:relative left-0 w-64 bg-white shadow-md p-6 h-250 transform transition-transform duration-300 ease-in-out z-20
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold text-purple-700 mb-6 text-center">
          Seller Panel
        </h2>
        <nav className="space-y-2">
          {menuItems.map(([key, label]) => (
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

          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className="block w-full text-left px-3 py-2 rounded-md font-medium transition text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            🚪 Logout
          </button>
        </nav>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <Modal
          title="Confirm Logout"
          message="Are you sure you want to logout? You'll need to login again to access your seller account."
          type="warning"
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
};

export default Sidebar;
