import { Link } from "react-router-dom";
import MembersSection from "../../components/MembersSection";
import FAQSection from "./FaqSection";
import UpcomingEvents from "./UpcomingEvents";
import HeroSection from "./HeroSection";
import WhyJoinUsSection from "./WhyJoinUsSection";
import GatewayToHeritage from "./GatewayToHeritage";
import FounderNote from "./FounderNote";
import CTASection from "./CTASection";

const Home = () => {
  return (
    <div className="">
      <HeroSection />

      <WhyJoinUsSection />

      {/* Members Section */}
      <div className="mt-5 ml-5 mr-5 max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Our Active Members</h2>
          <Link to="/members">
            <button className="text-white sm:px-2 px-4 py-2 rounded font-medium bg-linear-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300 md:h-11 items-center justify-center flex">
              View All Members
            </button>
          </Link>
        </div>
      </div>
      <MembersSection limit={8} />

      {/* 🪶 GATEWAY TO HERITAGE */}
      <GatewayToHeritage />

      {/* 🌺 FOUNDER’S NOTE */}
      <FounderNote />

      {/* 🗞 NEWS & EVENTS */}
      <UpcomingEvents />

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA */}
      <CTASection />
    </div>
  );
};

export default Home;
