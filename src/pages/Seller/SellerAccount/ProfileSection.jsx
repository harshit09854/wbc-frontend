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
} from "lucide-react";

const ProfileSection = () => {
  const [profileData,setProfiledata] = useState({
    businessName :"hi",
    email:"",
    phone:"",
    businessAddress:"",
    businessDescription:""
  })

  const { token } = useAuth();

  const fetchData = async () => {
    try {
      
        console.log(token)

      const res = await axiosInstance.get("/seller/profile",{
        headers :{Authorization :`Bearer ${token}`}
      });
      console.log(res.data.profile);
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

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">
        Profile 
      </h2>

      <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8 border border-gray-100">
        {/* --- Profile Info --- */}
        <div>
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
                name="shopName"
                placeholder="Enter your shop name"
                value={profileData.businessName}
                // onChange={handleProfileInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                // onChange={handleProfileInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                // onChange={handleProfileInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
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
                  // onChange={handleProfileInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Business Type
              </label>
              <input
                name="businessType"
                value={profileData.businessName}
                // onChange={handleProfileInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
              >
                
              </input>
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
                  // onChange={handleProfileInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- Save Button --- */}
        <div className="pt-4">
          {/* <button
            // onClick={handleProfileSubmit}
            // disabled={isUpdating}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          > soon */}
            {/* {isUpdating ? (
              "Saving..."
            ) : (
              <>
                <Save size={20} /> Save Changes
              </>
            )} */}
          {/* </button> */}
        </div>
      </div>
    </section>
  );
};

export default ProfileSection;
