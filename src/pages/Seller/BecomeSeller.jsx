import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// ... (Modal and FileUploadUI components are unchanged) ...
const Modal = ({ title, message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">{title}</h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <button
        onClick={onClose}
        className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Get Started
      </button>
    </div>
  </div>
);

const FileUploadUI = ({ qr }) => (
  <div className="flex flex-col items-center justify-center pt-5 pb-6">
    <svg
      className="w-8 h-8 mb-4 text-gray-500"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 16"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
      />
    </svg>
    {qr ? (
      <>
        <p className="mb-2 text-sm font-semibold text-green-600">
          File Selected:
        </p>
        <p className="text-xs text-gray-700">{qr.name}</p>
      </>
    ) : (
      <>
        <p className="mb-2 text-sm text-gray-500">
          <span className="font-semibold">Upload Your QR-Code</span>
        </p>
        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
      </>
    )}
  </div>
);

// --- EDIT START: Added new component for profile photo preview ---
/**
 * A UI component to display a circular preview of the selected profile photo
 * or a default avatar icon.
 */
const ProfilePhotoUploadUI = ({ file }) => {
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    // Create an object URL for the file
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Free memory when the component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div
      className={`flex items-center justify-center w-32 h-32 rounded-full bg-gray-100 border-2 border-gray-300 overflow-hidden text-gray-400 ${
        previewUrl ? "border-gold" : ""
      }`}
    >
      {previewUrl ? (
        <img
          src={previewUrl}
          alt="Profile Preview"
          className="w-full h-full object-cover"
        />
      ) : (
        // Default Avatar Icon
        <svg
          className="w-20 h-20"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          ></path>
        </svg>
      )}
    </div>
  );
};
// --- EDIT END ---

const BecomeSeller = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    businessName: "",
    businessType: "",
    address: "",
    pinCode: "",
    description: "",
    // --- EDIT START: Added profilePhoto to state ---
    profilePhoto: null,
    // --- EDIT END ---
    qr: null,
    acceptTerms: false,
  });

  const { user, login } = useAuth();

  useEffect(() => {
    if (user && !formData.fullName) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user, formData.fullName]);

  const validateForm = () => {
    const newErrors = {};
    const {
      fullName,
      email,
      phone,
      password,
      businessName,
      businessType,
      address,
      pinCode,
      description,
      // --- EDIT START: Destructure profilePhoto ---
      profileImage,
      // --- EDIT END ---
      qr,
      acceptTerms,
    } = formData;

    // Personal Info
    if (!fullName.trim()) newErrors.fullName = "Full name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    // --- EDIT START: Add profileImage validation ---
    if (!profileImage) newErrors.profileImage = "Profile photo is required";
    // --- EDIT END ---

    // Business Info
    if (!businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!businessType) newErrors.businessType = "Business type is required";
    if (!address.trim()) newErrors.address = "Address is required";
    if (!pinCode.trim()) newErrors.pinCode = "PIN code is required";
    else if (!/^\d{6}$/.test(pinCode))
      newErrors.pinCode = "PIN code must be 6 digits";

    // Product Info & File
    if (!description.trim())
      newErrors.description = "Business description is required";
    else if (description.trim().length < 50)
      newErrors.description = "Description must be at least 50 characters";
    if (!qr) newErrors.qr = "QR Code file is required";

    // Terms
    if (!acceptTerms)
      newErrors.acceptTerms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      qr: file || null,
    }));
    if (file) {
      setErrors((prev) => ({ ...prev, qr: "" }));
    }
  };

  // --- EDIT START: Added handler for profile photo ---
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      profileImage: file || null,
    }));
    if (file) {
      setErrors((prev) => ({ ...prev, profileImage: "" }));
    }
  };
  // --- EDIT END ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const AllFormData = new FormData();

      AllFormData.append("name", formData.fullName);
      AllFormData.append("email", formData.email);
      AllFormData.append("phone", formData.phone);
      AllFormData.append("password", formData.password);
      AllFormData.append("businessName", formData.businessName);
      AllFormData.append("businessType", formData.businessType);
      AllFormData.append("businessAddress", formData.address);
      AllFormData.append("pincode", formData.pinCode);
      AllFormData.append("businessDescription", formData.description);

      // --- EDIT START: Append profilePhoto to form data ---
      AllFormData.append("profileImage", formData.profileImage);
      // --- EDIT END ---

      AllFormData.append("qr", formData.qr); // The QR file

      try {
        const response = await axiosInstance.post(
          "/seller/signup",
          AllFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Signup successful:", response.data);
        const { token, role } = response.data;

        const userData = {
          name: formData.fullName,
          email: formData.email,
          role: role,
          businessName: formData.businessName,
          // You might want to get the profile photo URL from the response
          // and add it to userData here if the API returns it.
        };

        login(userData, token);
        setShowModal(true);
      } catch (error) {
        console.error(
          "Signup failed:",
          error.response ? error.response.data : error.message
        );
        setErrors((prev) => ({
          ...prev,
          form:
            error.response?.data?.message || "Server error. Please try again.",
        }));
        window.scrollTo(0, 0);
      }
    } else {
      console.log("Form validation failed:", errors);
      window.scrollTo(0, 0);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/seller-account", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Become a Member
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Join our community of women entrepreneurs and grow your business
          </p>

          {errors.form && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6"
              role="alert"
            >
              <span className="block sm:inline">{errors.form}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["fullName", "email", "password", "phone"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field === "fullName"
                        ? "Full Name *"
                        : field === "email"
                        ? "Email *"
                        : field === "password"
                        ? "Password *"
                        : "Phone *"}
                    </label>
                    <input
                      type={
                        field === "email"
                          ? "email"
                          : field === "password"
                          ? "password"
                          : "text"
                      }
                      name={field}
                      value={formData[field] || ""}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                        errors[field] ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* --- EDIT START: Added Profile Photo Upload Section --- */}
              <div className="pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Profile Photo *
                </label>
                <div className="flex items-center gap-6">
                  {/* The clickable preview area */}
                  <label
                    htmlFor="profile-photo-file"
                    className="cursor-pointer"
                  >
                    <ProfilePhotoUploadUI file={formData.profileImage} />
                    {/* The actual file input is hidden */}
                    <input
                      id="profile-photo-file"
                      type="file"
                      className="hidden"
                      onChange={handleProfilePhotoChange}
                      accept="image/png, image/jpeg"
                    />
                  </label>

                  {/* A separate button to change photo, also clickable */}
                  <label
                    htmlFor="profile-photo-file"
                    className="cursor-pointer bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {formData.profileImage ? "Change Photo" : "Select Photo"}
                  </label>
                </div>
                {/* Error message for profile photo */}
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.profileImage}
                  </p>
                )}
              </div>
              {/* --- EDIT END --- */}

              <p className="text-gray-600 text-center sm:text-left">
                Already a seller?{" "}
                <Link
                  to="/seller-login"
                  className="text-gold font-semibold hover:underline hover:text-gold-dark"
                >
                  Login here
                </Link>
              </p>
            </div>

            {/* --- Section 2: Business Info --- */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                Business Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["businessName", "businessType", "address", "pinCode"].map(
                  (field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field === "businessName"
                          ? "Business Name *"
                          : field === "businessType"
                          ? "Business Type *"
                          : field === "address"
                          ? "Business Address *"
                          : "PIN Code *"}
                      </label>
                      {field === "businessType" ? (
                        <select
                          name="businessType"
                          value={formData.businessType}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                            errors.businessType
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select Type</option>
                          <option value="food">Food & Beverages</option>
                          <option value="fashion">Fashion & Apparel</option>
                          <option value="handicrafts">Handicrafts</option>
                          <option value="beauty">Beauty & Wellness</option>
                          <option value="home">Home & Living</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <input
                          type="text"
                          name={field}
                          value={formData[field]}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                            errors[field] ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                      )}
                      {errors[field] && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors[field]}
                        </p>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>

            {/* ... (Section 3 & 4 are unchanged) ... */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                Product & Payment Information
              </h2>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold focus:border-transparent ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Tell us about your business and products..."
                />
                <div className="flex justify-between mt-1">
                  {errors.description && (
                    <p className="text-red-500 text-sm">{errors.description}</p>
                  )}
                  <p className="text-sm text-gray-500 ml-auto">
                    {formData.description.length}/50 characters minimum
                  </p>
                </div>
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Your Payment QR-Code *
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                      errors.qr ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <FileUploadUI qr={formData.qr} />
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/png, image/jpeg, image/gif, image/svg+xml"
                    />
                  </label>
                </div>
                {errors.qr && (
                  <p className="text-red-500 text-sm mt-1">{errors.qr}</p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
                Terms & Conditions
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg max-h-60 overflow-y-auto">
                <h3 className="font-semibold mb-4">Seller Agreement</h3>
                <div className="text-sm text-gray-600 space-y-3">
                  <p>
                    1. Provide accurate and complete information about your
                    business and products.
                  </p>
                  <p>
                    2. Responsible for quality and authenticity of products
                    listed.
                  </p>
                  <p>
                    3. Maintain fair pricing and transparent business practices.
                  </p>
                  {/* ... other terms ... */}
                  {/* <p>
                    4. Payments processed within 7-10 business days after order
                    completion.
                  </p> */}
                </div>
              </div>

              <label className="flex items-center space-x-3 mt-4">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className={`rounded border-gray-300 text-gold focus:ring-gold ${
                    errors.acceptTerms ? "border-red-500" : ""
                  }`}
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{" "}
                  <Link
                    to="/terms-conditions"
                    className="text-blue-600 hover:underline"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and and Seller Agreement *
                </span>
              </label>
              {errors.acceptTerms && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.acceptTerms}
                </p>
              )}

              {/* --- Final Submit Button --- */}
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-10 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors w-full md:w-auto"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title="CONGRATULATIONS!"
          message="Your Seller Account has been created."
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default BecomeSeller;
