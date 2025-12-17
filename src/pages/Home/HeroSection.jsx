import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function HeroSection() {
  const { isSeller } = useAuth();
  return (
    <section
      className="rounded-2xl overflow-hidden text-white p-8 shadow-xl"
      style={{
        backgroundImage: `
      radial-gradient(circle at 2px 2px, #ccc 1px, transparent 0),
      linear-gradient(90deg, rgba(106,13,173,1) 0%, rgba(155, 89, 182, 0.5))
    `,
        backgroundSize: "40px 40px, cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Manage Your Business Smarter & Faster
          </h1>
          <p className="text-white/90 text-lg mb-8">
            Join a vibrant community of women entrepreneurs offering wellness
            services and handmade products. Collaborate, grow, and showcase your
            story — all in one place.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center md:justify-start">
            {!isSeller() && (
              <Link to="/become-seller">
                <button className="w-full sm:w-auto mb-3 sm:mb-0 bg-white text-[#2A7B9B] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Become a Member
                </button>
              </Link>
            )}
            <Link to="/upcoming-events">
              <button className="w-full sm:w-auto bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded font-semibold hover:bg-white/30 transition-colors duration-300 border border-white/30">
                News & Events
              </button>
            </Link>
          </div>
        </div>

        {/* Right Image Preview */}
        <div className="w-full md:w-1/2 relative">
          {/* Glow Border Wrapper */}
          <div className="relative rounded overflow-hidden">
            <div className="">
              <div className="h-full w-full"></div>
            </div>

            {/* Actual Card */}
            <div className="relative shadow-2xl overflow-hidden">
              {/* Three Dots */}
              <div className="flex items-center space-x-2 p-3 pl-4 bg-[#111]/60 backdrop-blur-md">
                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              </div>

              {/* Image */}
              <img
                src="/Womens.jpg"
                alt="Dashboard Preview"
                className="w-full aspect-video object-cover"
              />
            </div>
          </div>

          {/* Decorative Gradient Circles */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-pink-300 rounded-full opacity-30 blur-2xl -z-10"></div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-300 rounded-full opacity-30 blur-2xl -z-10"></div>
        </div>
      </div>
    </section>
  );
}
