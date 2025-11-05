import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.png";
import {
  FaShoppingCart,
  FaUser,
  FaHeart,
  FaClipboardList,
  FaPhoneAlt,
  FaInfoCircle,
  FaUserPlus,
} from "react-icons/fa";

const Navbar = () => {
  const { isAuthenticated, logout, user, isSeller } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const dropdownRef = useRef(null);
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

  // Check if current path is seller-related
  const isSellerPage =
    location.pathname === "/become-seller" ||
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/seller-account");

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debug: Log authentication state
  // useEffect(() => {
  //   console.log("Auth State:", {
  //     isAuthenticated: isAuthenticated(),
  //     user,
  //     isSeller: isSeller(),
  //   });
  // }, [isAuthenticated, user, isSeller]);

  return (
    <nav className="bg-[#0B0B0D] py-2 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="WBC Logo"
                className="h-12 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Search Bar and Navigation - Hidden on Mobile */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              <Link
                to="/"
                className="text-white tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
              >
                HOME
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>

              {/* Hide Products link if user is seller */}
              {!isSeller() && !isSellerPage && (
                <Link
                  to="/products"
                  className="text-white tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
                >
                  PRODUCTS
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
              )}

              <Link
                to="/about-us"
                className="text-white tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
              >
                ABOUT
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>

              <Link
                to="/contact-us"
                className="text-white tracking-wide transition-colors duration-300 hover:text-[#B24592] relative group"
              >
                CONTACT
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Hide Cart icon if user is seller */}
            {!isSeller() && !isSellerPage && (
              <Link
                to="/cart"
                className="relative flex items-center space-x-1 text-[#ffffff] hover:text-[#6A0DAD] transition-colors duration-300"
              >
                <FaShoppingCart className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}

            {/* ALWAYS show user profile when authenticated */}
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

                  <Link
                    to="/seller-account"
                    className="flex items-center px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <FaUser className="mr-3 text-gray-500" />
                    <span>Dashboard</span>
                  </Link>

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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4.414l-4.293 4.293a1 1 0 01-1.414-1.414L11.586 7H6a1 1 0 110-2h5.586L8.293 1.707a1 1 0 011.414-1.414L14 4.586v2.828z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Show login button only when not authenticated AND not on seller pages
              !isSellerPage && (
                <div
                  className="relative group"
                  ref={dropdownRef}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <Link to="/login">
                    <button className="text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg">
                      <div className="flex items-center space-x-2">
                        <FaUser className="text-xl" />
                        <span>Login</span>
                      </div>
                    </button>
                  </Link>

                  {/* Dropdown Menu */}
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
                      <FaUserPlus className="mr-3 text-gray-500" />
                      <span>Sign Up</span>
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center px-4py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-all duration-300"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <FaUser className="mr-3 text-gray-500" />
                      <span>Login</span>
                    </Link>
                  </div>
                </div>
              )
            )}

            {/* Conditionally render Become Seller button - hide if user is already a seller or on seller pages */}
            {!isSellerPage && !isSeller() && (
              <Link
                to="/become-seller"
                className="text-white px-4 py-2 rounded-lg font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300"
              >
                Become a Seller
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-[#9B59B6] hover:text-[#6A0DAD] focus:outline-none transition-colors duration-300"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            {/* Mobile Menu Items */}
            <div className="space-y-2 px-2">
              {/* Show user info if authenticated */}
              {isAuthenticated() ? (
                <div className="px-3 py-2 border-b border-gray-700 mb-2">
                  <p className="text-white font-semibold truncate">
                    {user?.name || user?.businessName || "User"}
                  </p>
                  <p className="text-gray-400 text-sm truncate">
                    {user?.email || ""}
                  </p>
                  {isSeller() && (
                    <p className="text-xs text-purple-400 font-medium mt-1">
                      Seller Account
                    </p>
                  )}
                </div>
              ) : null}

              {/* Show login/signup only when not authenticated AND not on seller pages */}
              {!isAuthenticated() && !isSellerPage ? (
                <>
                  <Link
                    to="/signup"
                    className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus className="mr-3" />
                    <span>Sign Up</span>
                  </Link>
                  <Link
                    to="/login"
                    className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-3" />
                    <span>Login</span>
                  </Link>
                </>
              ) : null}

              {isAuthenticated() ? (
                <>
                  {/* Hide Cart in mobile if user is seller */}
                  {!isSeller() && !isSellerPage && (
                    <Link
                      to="/cart"
                      className="relative flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaShoppingCart className="mr-3" />
                      <span>Cart</span>
                      {cartCount > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-3" />
                    <span>My Profile</span>
                  </Link>

                  {/* Show seller dashboard if user is seller */}
                  {isSeller() && (
                    <Link
                      to="/seller-account"
                      className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaClipboardList className="mr-3" />
                      <span>Seller Dashboard</span>
                    </Link>
                  )}
                </>
              ) : null}

              {/* Hide Products link in mobile if user is seller */}
              {!isSeller() && !isSellerPage && (
                <Link
                  to="/products"
                  className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Products</span>
                </Link>
              )}

              <Link
                to="/about-us"
                className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaInfoCircle className="mr-3" />
                <span>About Us</span>
              </Link>
              <Link
                to="/contact-us"
                className="flex items-center px-3 py-2 rounded-md text-white hover:text-purple-300 border-width-1 border-transparent transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaPhoneAlt className="mr-3" />
                <span>Contact Us</span>
              </Link>

              {isAuthenticated() && (
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogout();
                  }}
                  className="flex items-center w-full px-3 py-2 rounded-md text-red-400 hover:text-red-300 border-width-1 border-transparent transition-all duration-300"
                >
                  <FaUser className="mr-3" />
                  <span>Logout</span>
                </button>
              )}

              {/* Conditionally render Become Seller button in mobile - hide if user is already seller */}
              {!isSellerPage && !isSeller() && (
                <Link
                  to="/become-seller"
                  className="flex items-center px-3 py-2 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] text-white rounded-md hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Become a Seller</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
