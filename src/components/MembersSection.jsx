import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import shally from "../../src/assets/shally-srivastava.jpg";
const MembersSection = () => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([
    {
      name: "",
      age: 50,
      businessName: "",
    },
  ]);

  // api call
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get("/member");
        setMembers(response.data.sellers || []);
        // console.log(response.data.sellers);
        // console.log(response.data.sellers[10].profileImage);
        // console.log(response.data.sellers[0]._id);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };
    fetchMembers();
  }, []); // Add empty dependency array

  // add mouse hover effect
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setHoveredCardIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredCardIndex(null);
  };

  return (
    <section className="py-10 px-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Our Active Members</h2>
        <button
          onClick={() => navigate("/members")}
          className="text-white sm:px-2 px-4 py-2 rounded font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300 md:h-11 items-center justify-center flex"
        >
          View All Members
        </button>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <div
            key={member._id || `${member.name}-${index}`}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={handleMouseLeave}
            className="relative bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition duration-300 hover:scale-105 hover:border hover:border-[#B24592] overflow-hidden"
          >
            {hoveredCardIndex === index && (
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(178, 69, 146, 0.3), transparent 60%)`,
                }}
              />
            )}

            <div className="flex justify-center">
              <img
                src={member.profileImage}
                alt={member.name || "Default Avatar"}
                className="w-16 h-16 rounded-full mb-4 object-cover"
              />
            </div>
            <h3 className="text-lg font-semibold text-center">{member.name}</h3>
            <div className="mt-4">
              <Link to={`/members/${member._id}`}>
                <button className="text-white sm:px-4 px-6 py-2 rounded-lg font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MembersSection;
