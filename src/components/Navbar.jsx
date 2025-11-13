import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaClipboardList,
  FaPhoneAlt,
  FaInfoCircle,
  FaUserPlus,
  FaUsers,
  FaCalendarAlt,
  FaHome,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, logout, user, isSeller } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.length);
    };

    updateCartCount();
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const isSellerPage =
    location.pathname === "/become-seller" ||
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/seller-account");

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[aria-label="Toggle menu"]')
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="py-2 top-0 left-0 right-0 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="WBC Logo"
                className="h-25 w-18 md:h-18 md:w-20 "
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            <Link
              to="/"
              className="tracking-wide font-semibold text-black transition-colors duration-300 hover:text-[#B24592] relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link
              to="/members"
              className="text-black font-semibold tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
            >
              Members
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link
              to="/about-us"
              className="text-black font-semibold tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
            >
              About Us
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>

            <Link
              to="/upcoming-events"
              className="text-black font-semibold tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
            >
              News & Events
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>

          {/* Desktop Icons & Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {!isSeller() && !isSellerPage && (
              <Link
                to="/cart"
                className="relative flex items-center space-x-1 text-gray-700 hover:text-[#B24592] transition-colors duration-300"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated() ? (
              <div
                className="relative group"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2 text-white hover:bg-[#B24592] font-medium border border-transparent rounded-md px-4 py-2 transition-all duration-300 bg-[#6A0DAD] bg-opacity-80 hover:bg-opacity-100">
                  <FaUser className="text-lg" />
                  <span className="max-w-32 truncate">
                    {user?.name || user?.businessName || "User"}
                  </span>
                </button>

                {/* User Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 transition-all duration-200 border ${
                    isDropdownOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                >
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || user?.businessName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                    {isSeller() && (
                      <p className="text-xs text-purple-600 font-medium mt-1">
                        Seller Account
                      </p>
                    )}
                  </div>

                  {isSeller() && (
                    <Link
                      to="/seller-account"
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaClipboardList className="mr-3 text-gray-500" />
                      <span>Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/my-profile"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="mr-3 text-gray-500" />
                    <span>My Profile</span>
                  </Link>

                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              !isSellerPage && (
                <div
                  className="relative group"
                  ref={dropdownRef}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link to="/login">
                    <button className="text-black px-4 py-2 transition-all duration-300 font-semibold border border-white bg-transparent hover:bg-gradient-to-r hover:from-[#B24592] hover:to-[#F15F79] hover:text-white hover:shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-xl" />
                        <span>Login</span>
                      </div>
                    </button>
                  </Link>

                  <div
                    className={`absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-2 z-50 transition-all duration-200 border ${
                      isDropdownOpen
                        ? "opacity-100 visible transform translate-y-0"
                        : "opacity-0 invisible transform -translate-y-2"
                    }`}
                  >
                    <Link
                      to="/signup"
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUserPlus className="mr-3" />
                      <span>Sign Up</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="mr-3" />
                      <span>Login</span>
                    </Link>
                  </div>
                </div>
              )
            )}

            {!isSellerPage && !isSeller() && (
              <Link
                to="/become-seller"
                className="text-white px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                Become a member
              </Link>
            )}
          </div>

          {/* Mobile Icons & Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            {!isSeller() && !isSellerPage && (
              <Link
                to="/cart"
                className="relative flex items-center text-gray-700 hover:text-[#B24592] transition-colors duration-300"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#B24592] focus:outline-none transition-colors duration-300 p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 visible transform translate-y-0"
              : "opacity-0 invisible transform -translate-y-2"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <Link
              to="/"
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 border border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaHome className="mr-3 text-lg" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              to="/members"
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 border border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaUsers className="mr-3 text-lg" />
              <span className="font-medium">Members</span>
            </Link>

            <Link
              to="/about-us"
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 border border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaInfoCircle className="mr-3 text-lg" />
              <span className="font-medium">About Us</span>
            </Link>

            <Link
              to="/upcoming-events"
              className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 border border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaCalendarAlt className="mr-3 text-lg" />
              <span className="font-medium">Upcoming Events</span>
            </Link>

            {/* Authentication Section */}
            <div className="border-t border-gray-200 pt-4 mt-4">
              {isAuthenticated() ? (
                <>
                  <div className="px-4 py-3 mb-3 bg-gray-50 rounded-lg border">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {user?.name || user?.businessName || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user?.email || ""}
                    </p>
                    {isSeller() && (
                      <p className="text-xs text-purple-600 font-medium mt-1">
                        Seller Account
                      </p>
                    )}
                  </div>

                  {isSeller() && (
                    <Link
                      to="/seller-account"
                      className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 mb-2 border border-gray-100"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaClipboardList className="mr-3 text-lg" />
                      <span className="font-medium">Dashboard</span>
                    </Link>
                  )}

                  <Link
                    to="/my-profile"
                    className="flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 mb-2 border border-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-3 text-lg" />
                    <span className="font-medium">My Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 border border-gray-100"
                  >
                    <span className="font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300 mb-3 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-2" />
                    <span>Login</span>
                  </Link>

                  <Link
                    to="/signup"
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-all duration-300 mb-3 border border-gray-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus className="mr-2" />
                    <span>Sign Up</span>
                  </Link>

                  {!isSellerPage && !isSeller() && (
                    <Link
                      to="/become-seller"
                      className="flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-[#B24592] to-[#F15F79] hover:from-[#6A0DAD] hover:to-[#9B59B6] transition-all duration-300 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span>Become a Member</span>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
