import React from "react";

const Modal = ({ title, message, onClose, type = "success", onConfirm }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
      <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
        type === "warning" ? "bg-red-100" : "bg-green-100"
      }`}>
        <span className="text-2xl">
          {type === "warning" ? "⚠️" : "✅"}
        </span>
      </div>
      <h2 className={`text-2xl font-bold mb-4 ${
        type === "warning" ? "text-red-600" : "text-green-600"
      }`}>
        {title}
      </h2>
      <p className="text-gray-700 mb-6">{message}</p>
      <div className="flex space-x-4 justify-center">
        {type === "warning" && (
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
        )}
        <button
          onClick={type === "warning" ? onConfirm : onClose}
          className={`px-6 py-2 rounded-lg text-white transition duration-200 ${
            type === "warning" 
              ? "bg-red-600 hover:bg-red-700" 
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {type === "warning" ? "Yes, Logout" : "Get Started"}
        </button>
      </div>
    </div>
  </div>
);

export default Modal;