import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { useAuth } from "../../../contexts/AuthContext";
import {
  User,
  Building2,
  MapPin,
  ClipboardList,
  Save,
  Phone,
  Edit,
  X,
  Camera,
  Lock,
} from "lucide-react";

const ProfileSection = () => {
  const [profileData,setProfiledata] = useState({
    businessName :"hi",
    email:"",
    phone:"",
    businessAddress:"",
    businessDescription:"",
    profileImage: ""
  })

  const [isEditing, setIsEditing] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Password Change State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      
        console.log(token)

      const res = await axiosInstance.get("/seller/profile",{
        headers :{Authorization :`Bearer ${token}`} 
      });
      console.log(res.data.profile);
      console.log("Profile Image:", res.data.profile.profileImage);
      setProfiledata(res.data.profile)
      
    } catch (err) {
      // keep console error for debugging; UI handling can be added later
      // eslint-disable-next-line no-console
      console.error("Failed to fetch profile:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfiledata((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("businessName", profileData.businessName || "");
      formData.append("phone", profileData.phone || "");
      formData.append("businessAddress", profileData.businessAddress || "");
      formData.append("businessDescription", profileData.businessDescription || "");
      
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }

      const res = await axiosInstance.post("/seller/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProfiledata(res.data.profile);
      setIsEditing(false);
      setImageFile(null);
      setPreviewImage(null);
      console.log("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = async () => {
    setPasswordMessage("");
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage("New passwords do not match.");
      return;
    }
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setPasswordMessage("All fields are required.");
      return;
    }

    try {
      await axiosInstance.post("/seller/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPasswordMessage("Password updated successfully!");
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      setShowPasswordForm(false);
    } catch (err) {
      setPasswordMessage(err.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Profile</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Edit size={18} /> Edit Profile
          </button>
        ) : (
          <button
            onClick={() => {
              setIsEditing(false);
              setPreviewImage(null);
              setImageFile(null);
              fetchData(); // Reset data
            }}
            className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <X size={18} /> Cancel
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100">
        {/* --- Profile Info --- */}
        <div>
          <div className="flex justify-center mb-6 relative w-fit mx-auto">
            <img
              src={previewImage || profileData.profileImage || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-200 shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 shadow-lg transition-all">
                <Camera size={18} />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <User className="text-purple-600" /> Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter your shop name"
                value={profileData.businessName}
                onChange={handleProfileInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={profileData.email}
                disabled={true} // Email usually not editable here
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={profileData.phone}
                onChange={handleProfileInputChange}
                disabled={!isEditing}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* --- Experience --- */}
        {/* <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Experience in Business
          </label>
          <select
            name="yearsInBusiness"
            value={profileFormData.yearsInBusiness}
            onChange={handleProfileInputChange}
            className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">Select Experience</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div> */}

        {/* --- Business Info --- */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <Building2 className="text-purple-600" /> Business Information
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Address
              </label>
              <div className="flex items-start gap-3">
                <MapPin className="text-gray-400 mt-2" size={18} />
                <textarea
                  name="businessAddress"
                  placeholder="Enter your complete business address"
                  rows="3"
                  value={profileData.businessAddress}
                  onChange={handleProfileInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Type
              </label>
              <input
                name="businessType" // Note: Backend doesn't currently return or update businessType in profile
                value={profileData.businessType || ""}
                disabled={true} // Disabled as it's not in the update logic
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Description
              </label>
              <div className="flex items-start gap-3">
                <ClipboardList className="text-gray-400 mt-2" size={18} />
                <textarea
                  name="description"
                  placeholder="Write a short description of your business"
                  rows="3"
                  value={profileData.businessDescription}
                  onChange={handleProfileInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Save Button --- */}
        {isEditing && (
          <div className="pt-4 flex justify-end">
            <button
              onClick={handleProfileSubmit}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition-all"
            >
              <Save size={20} /> Save Changes
            </button>
          </div>
        )}

        {/* --- Security Section (Change Password) --- */}
        <div className="pt-8 border-t border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Lock className="text-purple-600" /> Security
            </h3>
            <button
              onClick={() => setShowPasswordForm(!showPasswordForm)}
              className="text-purple-600 hover:text-purple-800 font-medium text-sm"
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
          </div>

          {showPasswordForm && (
            <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-200">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>
              {passwordMessage && <p className={`text-sm ${passwordMessage.includes("success") ? "text-green-600" : "text-red-600"}`}>{passwordMessage}</p>}
              <button onClick={submitPasswordChange} className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors">Update Password</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
