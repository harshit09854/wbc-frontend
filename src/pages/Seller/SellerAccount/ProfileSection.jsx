import React from "react";

const ProfileSection = ({ profileFormData, handleProfileInputChange, handleProfileSubmit }) => {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">👤 Profile</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shop Name
              </label>
              <input
                type="text"
                name="shopName"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                value={profileFormData.shopName}
                onChange={handleProfileInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent"
                value={profileFormData.email}
                onChange={handleProfileInputChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience in Business
          </label>
          <select
            name="yearsInBusiness"
            value={profileFormData.yearsInBusiness}
            onChange={handleProfileInputChange}
            className="w-50 px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="">Select Experience</option>
            <option value="0-1">Less than 1 year</option>
            <option value="1-3">1-3 years</option>
            <option value="3-5">3-5 years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Address
              </label>
              <textarea
                name="businessAddress"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={profileFormData.businessAddress}
                onChange={handleProfileInputChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Type
              </label>
              <select
                name="businessType"
                value={profileFormData.businessType}
                onChange={handleProfileInputChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select Type</option>
                <option value="food">Food & Beverages</option>
                <option value="fashion">Fashion & Apparel</option>
                <option value="handicrafts">Handicrafts</option>
                <option value="beauty">Beauty & Wellness</option>
                <option value="home">Home & Living</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Business Description
              </label>
              <textarea
                name="description"
                className="w-full px-3 py-2 border rounded-md"
                rows="3"
                value={profileFormData.description}
                onChange={handleProfileInputChange}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleProfileSubmit}
          className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default ProfileSection;