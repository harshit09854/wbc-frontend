import React from "react";
import { Link } from "react-router-dom";

function UpcomingEvents() {
  return (
    <div>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="flex-grow border-t border-purple-300"></div>
            <h2 className="px-4 text-3xl md:text-4xl font-serif font-bold text-[#6A0DAD] whitespace-nowrap">
              News & Events
            </h2>
            <div className="flex-grow border-t border-purple-300"></div>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Stay updated with our community happenings and upcoming programs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["event1.jpg", "event2.jpg", "event3.jpg"].map((img, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#F8F0FF] to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={`/${img}`}
                  alt="WBC Event"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-[#6A0DAD] mb-2">
                  {
                    [
                      "Networking Brunch",
                      "Leadership Workshop",
                      "Mentorship Program",
                    ][i]
                  }
                </h3>
                <p className="text-gray-600 mb-3">
                  {
                    [
                      "Connect with inspiring women and build lasting collaborations.",
                      "Grow your leadership skills with expert mentors.",
                      "One-on-one mentoring from experienced entrepreneurs.",
                    ][i]
                  }
                </p>
                <Link
                  to="#"
                  className="text-[#B24592] font-medium hover:underline"
                >
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default UpcomingEvents;
