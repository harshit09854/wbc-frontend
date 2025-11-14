import React, { useState } from "react";

function UpcomingEvents() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      img: "event1.jpg",
      title: "Networking Brunch",
      desc: "Connect with inspiring women and build lasting collaborations.",
      place: "Aarawali Hospital, Udaipur",
      details: [
        "Our Networking Brunch is designed to bring together women entrepreneurs, mentors, and community leaders in a warm and welcoming environment. Over freshly prepared meals and coffee, participants will have the opportunity to share their stories, exchange ideas, and build lasting collaborations.",
        "The brunch emphasizes the importance of community-driven growth, where every conversation can spark a new partnership or business opportunity. Attendees will be guided through structured networking activities, ensuring that everyone has the chance to connect meaningfully. The event also features short talks from experienced professionals who will share insights on overcoming challenges in business, balancing creativity with strategy, and fostering resilience. Beyond professional growth, the brunch is also about celebrating individuality and creativity, encouraging women to showcase their products and services in an informal setting.",
        "Whether you are just starting your entrepreneurial journey or are an established leader, this event provides a supportive space to expand your network. The Grand Hall at City Center in Jaipur offers a vibrant atmosphere, with elegant décor and comfortable seating arrangements that make the brunch both professional and enjoyable. With over 250 words of detail, this description highlights the event's focus on collaboration, inspiration, and empowerment, ensuring that participants leave with new connections, fresh ideas, and renewed motivation to pursue their goals.",
      ],
    },
    {
      img: "event2.jpg",
      title: "Leadership Workshop",
      desc: "Grow your leadership skills with expert mentors.",
      place: "Innovation Hub, Udaipur",
      details: [
        "The Leadership Workshop is a transformative program tailored for women entrepreneurs and professionals seeking to enhance their leadership capabilities. Hosted at the Innovation Hub in Udaipur, the workshop combines interactive sessions, group discussions, and practical exercises to help participants develop confidence, communication skills, and strategic thinking.",
        "Expert mentors from diverse industries will guide attendees through modules on decision-making, conflict resolution, and team management. The workshop emphasizes experiential learning, encouraging participants to engage in role-playing scenarios and case studies that mirror real-world challenges.",
        "By fostering collaboration, the program ensures that women not only learn from mentors but also from each other’s experiences. The venue itself, the Innovation Hub, is designed to inspire creativity and forward-thinking, with modern facilities and collaborative spaces that encourage active participation. The workshop also integrates mindfulness and self-reflection practices, recognizing that effective leadership begins with self-awareness.",
        "Participants will leave with actionable strategies to implement in their businesses or careers, along with a renewed sense of purpose and confidence. ",
      ],
    },
    {
      img: "event3.jpg",
      title: "Mentorship Program",
      desc: "One-on-one mentoring from experienced entrepreneurs.",
      place: "Amar Ashish Hospital, Madhuban, Udaipur",
      details: [
        "The Mentorship Program is a cornerstone initiative of the Women Business Circle, offering personalized guidance to women entrepreneurs at every stage of their journey. Taking place at the Community Center in Delhi, the program pairs participants with seasoned mentors who bring years of experience in diverse industries.",
        "Each mentorship relationship is tailored to the mentee’s specific goals, whether it is scaling a business, improving marketing strategies, or navigating financial challenges. The program emphasizes trust, collaboration, and accountability, ensuring that mentees receive not only advice but also actionable steps to achieve their objectives.",
        " Sessions are conducted in a supportive environment, with mentors providing constructive feedback and encouragement. The Community Center offers private meeting spaces and collaborative areas, making it ideal for one-on-one discussions as well as group mentoring sessions. Beyond professional development, the program also fosters personal growth, helping women build confidence, resilience, and clarity in their vision.",
        "Networking opportunities are integrated, allowing mentees to connect with peers and expand their support system. This 250-word description highlights the program’s depth, showcasing how mentorship can transform not just businesses but lives. By bridging the gap between experience and ambition, the Mentorship Program empowers women to take bold steps toward success, guided by mentors who genuinely care about their journey.",
      ],
    },
    {
      img: "event4.jpg",
      title: "Networking Brunch",
      desc: "Connect with inspiring women and build lasting collaborations.",
      place: "Grand Hall, City Center, Jaipur",
      details: [
        "Our Networking Brunch is designed to bring together women entrepreneurs, mentors, and community leaders in a warm and welcoming environment. Over freshly prepared meals and coffee, participants will have the opportunity to share their stories, exchange ideas, and build lasting collaborations.",
        "The brunch emphasizes the importance of community-driven growth, where every conversation can spark a new partnership or business opportunity. Attendees will be guided through structured networking activities, ensuring that everyone has the chance to connect meaningfully. The event also features short talks from experienced professionals who will share insights on overcoming challenges in business, balancing creativity with strategy, and fostering resilience.",
        "Beyond professional growth, the brunch is also about celebrating individuality and creativity, encouraging women to showcase their products and services in an informal setting. Whether you are just starting your entrepreneurial journey or are an established leader, this event provides a supportive space to expand your network. The Grand Hall at City Center in Jaipur offers a vibrant atmosphere, with elegant décor and comfortable seating arrangements that make the brunch both professional and enjoyable.",
        "With over 250 words of detail, this description highlights the event’s focus on collaboration, inspiration, and empowerment, ensuring that participants leave with new connections, fresh ideas, and renewed motivation to pursue their goals.",
      ],
    },
    {
      img: "event1.jpg",
      title: "Networking Brunch",
      desc: "Connect with inspiring women and build lasting collaborations.",
      place: "Grand Hall, City Center, Jaipur",
      details: [
        "Our Networking Brunch is designed to bring together women entrepreneurs, mentors, and community leaders in a warm and welcoming environment. Over freshly prepared meals and coffee, participants will have the opportunity to share their stories, exchange ideas, and build lasting collaborations.",
        "The brunch emphasizes the importance of community-driven growth, where every conversation can spark a new partnership or business opportunity. Attendees will be guided through structured networking activities, ensuring that everyone has the chance to connect meaningfully. The event also features short talks from experienced professionals who will share insights on overcoming challenges in business, balancing creativity with strategy, and fostering resilience.",
        "Beyond professional growth, the brunch is also about celebrating individuality and creativity, encouraging women to showcase their products and services in an informal setting. Whether you are just starting your entrepreneurial journey or are an established leader, this event provides a supportive space to expand your network. The Grand Hall at City Center in Jaipur offers a vibrant atmosphere, with elegant décor and comfortable seating arrangements that make the brunch both professional and enjoyable.",
        "With over 250 words of detail, this description highlights the event’s focus on collaboration, inspiration, and empowerment, ensuring that participants leave with new connections, fresh ideas, and renewed motivation to pursue their goals.",
      ],
    },
  ];

  return (
    <div>
      <section
        className="py-16 md:py-24 rounded-2xl overflow-hidden"
        style={{
          backgroundImage: `
      radial-gradient(circle at 2px 2px, #ccc 1px, transparent 0),
      linear-gradient(to bottom, #ffffff, #ffffff)
    `,
          backgroundSize: "40px 40px, cover",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          {/* Heading */}
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

          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#F8F0FF] to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={`/${event.img}`}
                  alt="WBC Event"
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-[#6A0DAD] mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-3">{event.desc}</p>
                <button
                  onClick={() => setSelectedEvent(event)}
                  className="text-[#B24592] font-medium hover:underline"
                >
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full p-6 relative max-h-[80vh] overflow-y-auto">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <img
              src={`/${selectedEvent.img}`}
              alt={selectedEvent.title}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-[#6A0DAD] mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-sm text-gray-500 italic mb-2">
              📍 {selectedEvent.place}
            </p>
            {selectedEvent.details.map((para, idx) => (
              <p key={idx} className="text-gray-700 mb-4">
                {para}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UpcomingEvents;
