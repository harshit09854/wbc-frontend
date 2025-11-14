import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Lock,
  Package,
  Upload,
  Shield,
} from "lucide-react";
import axiosInstance from "../../api/axiosInstance";
export default function MyProfilePage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/buyer/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response.data.buyerData.email);

        setUser(response.data.buyerData);
      } catch {
        // res.send("error");
        console.log("error");
      }
    };

    fetchData();
  }, []);

  const [editing, setEditing] = useState(false);

  const handleEdit = () => setEditing(!editing);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser({ ...user, image: URL.createObjectURL(file) });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-100 to-gray-200 flex flex-col items-center py-10 px-4">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-3 sm:mb-0">
            My Profile
          </h1>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
          >
            <Edit size={16} />
            {editing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Profile Photo */}
          <div className="flex flex-col items-center bg-gray-50 border rounded-2xl p-6 shadow-sm">
            <img
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-md mb-4"
            />

            <label className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
              <Upload size={16} />
              Upload New
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          {/* Middle - User Info */}
          <div className="md:col-span-2 bg-gray-50 border rounded-2xl p-6 shadow-sm space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                {editing ? (
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-medium text-gray-800 flex items-center gap-2">
                    <User className="text-blue-500" size={18} /> {user.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="text-sm text-gray-500">Email Address</label>
                {editing ? (
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-medium text-gray-800 flex items-center gap-2">
                    <Mail className="text-blue-500" size={18} /> {user.email}
                  </p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Phone */}
              <div>
                <label className="text-sm text-gray-500">Phone Number</label>
                {editing ? (
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) =>
                      setUser({ ...user, phone: e.target.value })
                    }
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-medium text-gray-800 flex items-center gap-2">
                    <Phone className="text-blue-500" size={18} /> {user.phone}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-sm text-gray-500">Address</label>
                {editing ? (
                  <textarea
                    rows="2"
                    value={user.address}
                    onChange={(e) =>
                      setUser({ ...user, address: e.target.value })
                    }
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="mt-1 font-medium text-gray-800 flex items-center gap-2">
                    <MapPin className="text-blue-500" size={18} />{" "}
                    {user.address}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
