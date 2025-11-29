import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

// ---------------- Toast Component ----------------
const Toast = ({ id, type, message, onClose }) => {
  return (
    <div
      className={`flex items-start gap-3 w-96 p-3 rounded-lg shadow-lg border-l-4 bg-white
        ${type === "success" ? "border-l-green-500" : "border-l-red-500"}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex-shrink-0 mt-0.5">
        {type === "success" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414L9 13.414l4-4z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11V6a1 1 0 10-2 0v1a1 1 0 102 0zm0 6a1 1 0 10-2 0 1 1 0 002 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className="flex-1">
        <p
          className={`text-sm font-semibold ${
            type === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {type === "success" ? "Success" : "Error"}
        </p>
        <p className="text-sm text-gray-700 mt-1">{message}</p>
      </div>

      <button
        onClick={() => onClose(id)}
        className="ml-3 text-gray-400 hover:text-gray-600 focus:outline-none"
        aria-label="Close notification"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

// ---------------- AddProduct Component ----------------
const AddProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state?.editMode || false;
  const productToEdit = location.state?.product || null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    images: [], // File objects or existing URLs
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Initialize form in edit mode
  useEffect(() => {
    if (isEditMode && productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        description: productToEdit.description || "",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        category: productToEdit.category || "",
        images: productToEdit.images || [],
      });
    }
  }, [isEditMode, productToEdit]);

  // ---------------- Toast Helpers ----------------
  const addToast = (type, message, duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), duration);
  };
  const removeToast = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  // ---------------- Image Handlers ----------------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const existingImagesCount = formData.images.filter(
      (img) => !(img instanceof File)
    ).length;

    if (files.length + existingImagesCount > 3) {
      addToast(
        "error",
        `You can upload a maximum of 3 images total. You tried to upload ${files.length} more.`
      );
      return;
    }

    const imageFiles = files.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length !== files.length) {
      addToast("error", "Only image files are allowed.");
      return;
    }

    setFormData((s) => ({ ...s, images: [...s.images, ...imageFiles] }));
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    setFormData((s) => {
      const arr = [...s.images];
      arr.splice(index, 1);
      return { ...s, images: arr };
    });
  };

  // ---------------- Other Inputs ----------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------------- Validation ----------------
  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Product name is required";
    if (!formData.price) errors.price = "Price is required";
    else if (parseFloat(formData.price) <= 0)
      errors.price = "Price must be greater than 0";
    if (!formData.stock) errors.stock = "Stock is required";
    else if (parseInt(formData.stock) < 0)
      errors.stock = "Stock cannot be negative";
    if (!formData.category) errors.category = "Category is required";
    if (!isEditMode && formData.images.length === 0)
      errors.images = "At least one image is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ---------------- Submit ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      addToast("error", "Please fix the errors in the form");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);

    // Only append new files
    const newImageFiles = formData.images.filter((img) => img instanceof File);
    newImageFiles.forEach((file) => data.append("productImage", file));

    try {
      let response;
      const productId = productToEdit?.id;

      if (isEditMode && productId) {
        response = await axiosInstance.put(
          `/seller/product/update/${productId}`,
          data
        );
        addToast("success", "Product updated successfully!");
      } else {
        response = await axiosInstance.post(`/seller/product/add`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addToast(
          "success",
          response.data.message || "Product added successfully!"
        );
      }

      setTimeout(() => navigate("/seller-account"), 1200);
    } catch (err) {
      console.error("API Error:", err.response || err);
      addToast(
        "error",
        err.response?.data?.message || "Failed to save product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------- Cleanup object URLs ----------------
  useEffect(() => {
    return () => {
      formData.images.forEach((file) => {
        if (file instanceof File && file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [formData.images]);

  const getImageSource = (file) =>
    file instanceof File ? URL.createObjectURL(file) : file.url || file;

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      {/* Toasts */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onClose={removeToast} />
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
          {isEditMode ? "✏️ Edit Product" : "🛍️ Add New Product"}
        </h2>

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="block text-gray-700 mb-2">
              Product Name
            </label>
            <input
              id="productName"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter product name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="productDescription"
              className="block text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="productDescription"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="productPrice"
                className="block text-gray-700 mb-2"
              >
                Price (₹)
              </label>
              <input
                id="productPrice"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter price"
              />
              {formErrors.price && (
                <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="productStock"
                className="block text-gray-700 mb-2"
              >
                Stock
              </label>
              <input
                id="productStock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                  formErrors.stock ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Available quantity"
              />
              {formErrors.stock && (
                <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label
              htmlFor="productCategory"
              className="block text-gray-700 mb-2"
            >
              Category
            </label>
            <select
              id="productCategory"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-purple-500 ${
                formErrors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Category</option>
              <option value="fashion">Fashion</option>
              <option value="food">Food & Beverages</option>
              <option value="beauty">Beauty & Wellness</option>
              <option value="home">Home & Living</option>
              <option value="handicrafts">Handicrafts</option>
            </select>
            {formErrors.category && (
              <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
            )}
          </div>

          {/* Upload Box */}
          <div>
            <label className="block text-gray-700 mb-2">
              Upload Images (Max 3)
            </label>

            <div
              onClick={() => document.getElementById("fileInput")?.click()}
              onKeyDown={(e) =>
                e.key === "Enter" &&
                document.getElementById("fileInput")?.click()
              }
              role="button"
              tabIndex={0}
              className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center cursor-pointer hover:bg-purple-50 transition"
            >
              <p className="text-gray-600 font-medium">
                Click to upload or select files
              </p>
              <p className="text-sm text-gray-400 mt-1">
                You can upload up to 3 images (jpg, png)
              </p>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {formData.images.map((file, idx) => {
                  const src = getImageSource(file);
                  return (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden border"
                    >
                      <img
                        src={src}
                        alt={`preview-${idx}`}
                        className="w-full h-28 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        aria-label={`Remove image ${idx + 1}`}
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating Product..."
                  : "Adding Product..."
                : isEditMode
                ? "Update Product"
                : "Add Product"}
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full mt-0 border border-purple-600 text-purple-600 py-3 rounded-lg hover:bg-purple-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
