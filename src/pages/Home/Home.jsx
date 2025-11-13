import { Link } from "react-router-dom";
import ProductList from "../../components/ProductList";
import { Heart, Users, Briefcase, BarChart, Sparkles } from "lucide-react";
import { useState } from "react";
import MembersSection from "../../components/MembersSection";
import FAQSection from "./FaqSection";
import UpcomingEvents from "./UpcomingEvents";

const Home = () => {
  return (
    <div>
      {/* 🌸 HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col md:flex-row items-center bg-gradient-to-br from-[#6A0DAD] via-[#9B59B6] to-[#F15F79]">
        {/* Background Image */}
        <div className="w-full h-full md:absolute left-0 top-0">
          <img
            src="/Womens.jpg"
            alt="Women Business Circle Members"
            className="w-full h-[50vh] md:h-[90vh] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
        </div>

        {/* Glassy Content Card */}
        <div className="relative w-[90%] sm:w-[80%] md:w-[45%] lg:w-[38%] bg-white/20 backdrop-blur-md border border-white/20 text-white p-6 sm:p-8 lg:p-12 rounded shadow-xl mx-4 md:mr-10 md:ml-auto -mt-8 md:mt-0 transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg hover:border-white/30">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight text-white/90">
            Women Business Circle
          </h1>
          <p className="text-white/80 mb-6 text-base">
            A community of women entrepreneurs offering{" "}
            <strong>wellness services</strong> and
            <strong> handmade products</strong> that celebrate creativity,
            connection, and care.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <Link to="/upcoming-events">
              <button className="w-full sm:w-auto mt-3 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] text-white px-8 py-3 rounded font-semibold hover:from-[#B24592] hover:to-[#F15F79] transition-all duration-300 shadow-lg hover:shadow-xl">
                Upcoming Events
              </button>
            </Link>
            <Link to="/become-seller">
              <button className="w-full sm:w-auto mt-3 bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded font-semibold hover:bg-white/50 transition-colors duration-300">
                Join as a Member
              </button>
            </Link>
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
      <div className="mt-5 ml-5 mr-5 max-w-7xl mx-auto px-4 md:px-8"></div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Our Active Members</h2>
        <Link to="/members">
          <button
            // onClick={() => navigate("/members")}
            className="text-white sm:px-2 px-4 py-2 rounded font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300 md:h-11 items-center justify-center flex"
          >
            View All Members
          </button>
        </Link>
      </div>
      <MembersSection />
      {/* </div> */}

      {/* 🌷 OUR PRODUCTS */}
      {/* <section className="py-16 md:py-24 bg-amber-50">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-grow border-t border-purple-300"></div>
            <h2 className="px-4 text-3xl md:text-4xl font-serif font-bold text-[#6A0DAD] whitespace-nowrap">
              Shop from Our Women Entrepreneurs
            </h2>
            <div className="flex-grow border-t border-purple-300"></div>
          </div>
        </div>
        <ProductList />
      </section> */}

      {/* 🪶 GATEWAY TO HERITAGE */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6A0DAD] mb-6">
              Empowering India’s Women, One Product at a Time
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
            <div className="relative">
              <img
                src="/WBC.jpg"
                alt="WBC Group Photo"
                className="w-full h-90 rounded-lg shadow-xl"
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
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#6A0DAD] mb-6">
              Founder’s Note
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              “When I founded the{" "}
              <span className="font-semibold text-[#6A0DAD]">
                Women Business Circle
              </span>
              , I envisioned a space where women could transform creativity into
              purpose and purpose into prosperity.”
            </p>
            <p className="text-lg text-gray-700 italic mb-6">
              “Empowered women empower communities — and that’s our everyday
              mission.”
            </p>
            <h3 className="text-xl font-semibold text-[#6A0DAD]">
              — Acharya Anima Goswami
            </h3>
            <p className="text-gray-600 text-base">
              Founder, Women Business Circle
            </p>
          </div>
        </div>
      </section>

      {/* 🗞 NEWS & EVENTS */}
      <UpcomingEvents />

      {/* FAQ Section */}
      <FAQSection />
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
