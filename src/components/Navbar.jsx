import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState, useRef, useEffect } from "react";
import {
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

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  const hideNav = isSeller();

  const isSellerPage =
    location.pathname === "/become-seller" ||
    location.pathname.startsWith("/seller") ||
    location.pathname.startsWith("/seller-account");

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    window.location.href = "/";
  };

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                className="h-25 w-18 md:h-18 md:w-20"
              />
            </Link>
          </div>

          {/* Desktop Navigation (HIDDEN FOR SELLERS) */}
          {!hideNav && (
            <div className="hidden md:flex items-center justify-center space-x-8">
              <Link
                to="/"
                className="tracking-wide font-semibold text-black hover:text-[#B24592] relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                to="/members"
                className="text-black font-semibold tracking-wide hover:text-[#B24592] relative group"
              >
                Members
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                to="/about-us"
                className="text-black font-semibold tracking-wide hover:text-[#B24592] relative group"
              >
                About Us
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>

              <Link
                to="/upcoming-events"
                className="text-black font-semibold tracking-wide hover:text-[#B24592] relative group"
              >
                News & Events
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#B24592] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          )}

          {/* Desktop Icons & User Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated() ? (
              <div
                className="relative group"
                ref={dropdownRef}
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="flex items-center space-x-2 text-white bg-[#6A0DAD] font-medium rounded-md px-4 py-2 transition-all">
                  <FaUser className="text-lg" />
                  <span className="max-w-32 truncate">
                    {user?.name || user?.businessName || "User"}
                  </span>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 transition-all border ${
                    isDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  <div className="px-4 py-2 border-b">
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
                      className="flex items-center px-4 py-2 hover:bg-purple-50"
                    >
                      <FaClipboardList className="mr-3" />
                      Dashboard
                    </Link>
                  )}

                  {!isSeller() && (
                    <Link
                      to="/my-profile"
                      className="flex items-center px-4 py-2 hover:bg-purple-50"
                    >
                      <FaUser className="mr-3" />
                      My Profile
                    </Link>
                  )}

                  <div className="border-t mt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              !isSellerPage && (
                <Link to="/login">
                  <button className="text-black px-4 py-2 font-semibold border hover:bg-gradient-to-r hover:from-[#B24592] hover:to-[#F15F79] hover:text-white transition-all">
                    <div className="flex items-center space-x-2">
                      <FaUser className="text-xl" />
                      <span>Login</span>
                    </div>
                  </button>
                </Link>
              )
            )}

            {!isSellerPage && !isSeller() && (
              <Link
                to="/become-seller"
                className="text-white px-4 py-2 rounded-lg bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6]"
              >
                Become a member
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center space-x-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2"
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

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t transition-all ${
            isMenuOpen
              ? "opacity-100 visible translate-y-0"
              : "opacity-0 invisible -translate-y-2"
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Nav Links (HIDDEN FOR SELLERS) */}
            {!hideNav && (
              <>
                <Link
                  to="/"
                  className="flex items-center px-4 py-3 border rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaHome className="mr-3" /> Home
                </Link>

                <Link
                  to="/members"
                  className="flex items-center px-4 py-3 border rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaUsers className="mr-3" /> Members
                </Link>

                <Link
                  to="/about-us"
                  className="flex items-center px-4 py-3 border rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaInfoCircle className="mr-3" /> About Us
                </Link>

                <Link
                  to="/upcoming-events"
                  className="flex items-center px-4 py-3 border rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaCalendarAlt className="mr-3" /> Upcoming Events
                </Link>
              </>
            )}

            <div className="border-t pt-4 mt-4">
              {isAuthenticated() ? (
                <>
                  <div className="px-4 py-3 bg-gray-50 rounded-lg border mb-3">
                    <p className="text-sm font-semibold">
                      {user?.name || user?.businessName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  {isSeller() && (
                    <Link
                      to="/seller-account"
                      className="flex items-center px-4 py-3 border rounded-lg mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaClipboardList className="mr-3" />
                      Dashboard
                    </Link>
                  )}

                  {!isSeller() && (
                    <Link
                      to="/my-profile"
                      className="flex items-center px-4 py-3 border rounded-lg mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <FaUser className="mr-3" />
                      My Profile
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-3 border rounded-lg text-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center justify-center px-4 py-3 rounded-lg text-white bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUser className="mr-2" /> Login
                  </Link>

                  <Link
                    to="/signup"
                    className="flex items-center justify-center px-4 py-3 rounded-lg border"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <FaUserPlus className="mr-2" /> Sign Up
                  </Link>

                  {!isSellerPage && !isSeller() && (
                    <Link
                      to="/become-seller"
                      className="flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-[#B24592] to-[#F15F79] text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Become a Member
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
