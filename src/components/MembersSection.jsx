import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Briefcase } from "lucide-react";

const MembersSection = ({ limit }) => {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);

  // Manual age mapping
  const manualAges = {
    "Shally Srivastava": 28,
    "Rukhsana Sabunwala": 35,
    "Acharya Dhankunwer Nagar": 42,
    "Pratima S. Ratnani": 49,
  };

  // api call
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axiosInstance.get("/member");
        setMembers(response.data.sellers || []);
      } catch (error) {
        console.error("Failed to fetch members:", error);
      }
    };
    fetchMembers();
  }, []);

  // apply limit if provided
  const displayedMembers = limit ? members.slice(0, limit) : members;

  // mouse hover effect
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

  const handleMouseLeave = () => setHoveredCardIndex(null);

  return (
    <section
      className="py-10 rounded-2xl overflow-hidden"
      style={{
        backgroundImage: `
      radial-gradient(circle at 2px 2px, #ccc 1px, transparent 0),
      linear-gradient(to bottom, #f9fafb, #f9fafb)
    `,
        backgroundSize: "40px 40px, cover",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedMembers.map((member, index) => (
            <div
              key={member._id || `${member.name}-${index}`}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
              className="relative bg-white shadow-md rounded-lg p-4 flex flex-col justify-between items-center transition duration-300 hover:scale-105 hover:border hover:border-[#B24592] overflow-hidden min-h-[300px]"
            >
              {hoveredCardIndex === index && (
                <div
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(188, 116, 236, 0.3), transparent 60%)`,
                  }}
                />
              )}

              <div className="flex flex-col items-center flex-grow">
                <img
                  src={member.profileImage}
                  alt={member.name || "Default Avatar"}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />
                <p className="text-sm text-gray-500">
                  Age: {manualAges[member.name] || "N/A"}
                </p>
                <h3 className="text-lg font-semibold text-center">
                  {member.name && member.name.length > 15
                    ? member.name.slice(0, 15) + "..."
                    : member.name}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-gray-600">
                  <Briefcase size={14} className="flex-shrink-0" />
                  <span className="text-sm font-semibold truncate max-w-[150px]">
                    {member.businessName && member.businessName.length > 15
                      ? member.businessName.slice(0, 15) + "..."
                      : member.businessName}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <Link to={`/members/${member._id}`}>
                  <button className="text-white px-6 py-2 rounded font-medium bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] hover:from-[#B24592] hover:to-[#F15F79] hover:shadow-lg transition-all duration-300">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
