import { Link } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { Heart, Users, Briefcase, BarChart, Sparkles } from "lucide-react";
import { useState } from "react";
import MembersSection from "../../components/MembersSection";
import FAQSection from "./FaqSection";
import UpcomingEvents from "./UpcomingEvents";

const Home = () => {
  return (
    <div className="">
      {/* 🌸 HERO SECTION */}
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
              services and handmade products. Collaborate, grow, and showcase
              your story — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 justify-center md:justify-start">
              <Link to="/become-">
                <button className="w-full sm:w-auto mb-3 sm:mb-0 bg-white text-[#2A7B9B] px-8 py-3 rounded font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Become a Member
                </button>
              </Link>
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

      {/* 💫 WHY JOIN US */}
      <section className="py-16 md:py-24 bg-[#F8F0FF]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#6A0DAD] mb-4">
            Why Join the Circle?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-16">
            We empower women to become financially independent through
            collaboration and creativity.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Feature
              icon={<Users />}
              title="Empowering Community"
              text="Be part of a supportive sisterhood that uplifts and celebrates women entrepreneurs."
            />
            <Feature
              icon={<Briefcase />}
              title="Business Resources"
              text="Access mentorship, workshops, and digital tools to grow your business."
            />
            <Feature
              icon={<BarChart />}
              title="Growth Opportunities"
              text="Showcase your products and services to reach customers who believe in your story."
            />
          </div>
        </div>
      </section>

      {/* Our Members */}
      <div className="mt-5 ml-5 mr-5 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Our Active Members</h2>
          <Link to="/members">
            <button className="text-white sm:px-2 px-4 py-2 rounded font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300 md:h-11 items-center justify-center flex">
              View All Members
            </button>
          </Link>
        </div>
      </div>
      <MembersSection limit={8} />

      {/* 🪶 GATEWAY TO HERITAGE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2  md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6A0DAD] mb-6">
              Empowering India's Women, One Product at a Time
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              Every jar of pickle, every handmade toy, every crafted bag carries
              the heart of a woman entrepreneur.
            </p>
            <p className="text-lg text-gray-700 mb-4 font-semibold">
              When you shop here, you support dreams — not corporations.
            </p>
            <Link to="/about-us">
              <button className="mt-6 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] text-white px-8 py-3 rounded font-semibold hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300 shadow-lg hover:shadow-xl">
                Know More
              </button>
            </Link>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/WBC.jpg"
                alt="WBC Group Photo"
                className="w-full h-90 rounded-lg shadow-xl object-cover transition-transform duration-500 ease-out hover:scale-105"
              />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-100 rounded-full opacity-50 -z-10"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-100 rounded-full opacity-50 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 🌺 FOUNDER’S NOTE */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#F8F0FF] via-white to-[#F8F0FF] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#B24592]/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#6A0DAD]/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-20">
          {/* Founder Image */}
          <div className="group relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white/70 backdrop-blur-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:scale-105">
            <img
              src="./Aacharya-anima.jpeg"
              alt="Founder of Women Business Circle"
              className="w-full h-full object-cover rounded-full transform transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#B24592]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"></div>
            <div className="absolute inset-0 w-72 h-72 md:w-96 md:h-96 rounded-full bg-gradient-to-tr from-[#B24592] to-[#F15F79] opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500 -z-10"></div>
          </div>

          {/* Text */}
          <div className="w-full md:w-2/3">
            {/* <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6A0DAD] mb-6  md:text-left">
              Founder’s Note
            </h2> */}

            <div className="bg-purple-50/60 p-6 md:p-8 rounded-xl border-l-4 border-[#6A0DAD] shadow-sm">
              <p className="text-lg text-gray-700 mb-4 leading-relaxed italic">
                “When I founded the
                <span className="font-semibold text-[#6A0DAD]">
                  {" "}
                  Women Business Circle
                </span>
                , I envisioned a space where women could transform creativity
                into purpose and purpose into prosperity.”
              </p>

              <p className="text-lg text-gray-700 italic mb-6 leading-relaxed">
                “Empowered women empower communities — and that’s our everyday
                mission.”
              </p>

              <h3 className="text-xl font-semibold text-[#6A0DAD] mt-4">
                — Acharya Anima Goswami
              </h3>
              <p className="text-gray-600 text-base">
                Founder, Women Business Circle
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 🗞 NEWS & EVENTS */}
      <UpcomingEvents />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA */}
      <section className="py-10 bg-gradient-to-r from-yellow-50 to-orange-50 text-black text-center">
        <div className="max-w-4xl mx-auto px-4">
          <Heart className="w-16 h-16 mx-auto mb-6 text-[#E8B931]" />
          <h2 className="text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-10 text-black/80">
            Join a community that believes in your dreams and supports your
            growth every step of the way.
          </p>
          <Link to="/become-seller">
            <button className="bg-[#E8B931] text-[#2A5C4F] px-8 py-2 rounded  font-bold text-lg hover:bg-[#D4A621] transition-all duration-300 shadow-xl hover:shadow-2xl">
              Become a Member Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Reusable Feature component
const Feature = ({ icon, title, text }) => (
  <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-16 h-16 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
      {icon}
    </div>
    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{text}</p>
  </div>
);

export default Home;
