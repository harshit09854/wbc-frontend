import React, { useState } from "react";

const PaymentsSection = () => {
  const [qrCode, setQrCode] = useState(null); // Initially no QR code
  const [upiId, setUpiId] = useState("your-upi-id@okaxis");

  const payments = {
    currentBalance: "₹5,000",
    lastPayout: "20 Oct 2025",
    pendingAmount: "₹2,500",
  };

  const handleQrCodeUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrCode(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveQrCode = () => {
    setQrCode(null);
  };

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💰 Payments</h2>
      <div className="bg-white p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Current Balance:</span>
          <span className="text-2xl font-bold text-green-600">
            {payments.currentBalance}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Pending Amount:</span>
          <span className="text-xl font-semibold text-yellow-600">
            {payments.pendingAmount}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Last Payout:</span>
          <span className="text-gray-600">{payments.lastPayout}</span>
        </div>
        <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition">
          Request Payout
        </button>

        {/* QR Code Management */}
        <div className="border-t pt-6 mt-6">
          <h3 className="text-xl font-semibold mb-3">Payment QR Code</h3>
          <div className="flex items-center gap-6">
            <div className="w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
              {qrCode ? (
                <img
                  src={qrCode}
                  alt="QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-gray-400 text-sm text-center">
                  No QR Code
                </span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-gray-600 mb-2">
                Upload your UPI QR code to receive payments directly from
                customers.
              </p>
              <div className="flex gap-2">
                <label
                  htmlFor="qr-upload"
                  className="cursor-pointer bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                >
                  {qrCode ? "Change QR Code" : "Upload QR Code"}
                </label>
                <input
                  id="qr-upload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={handleQrCodeUpload}
                />
                {qrCode && (
                  <button
                    onClick={handleRemoveQrCode}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentsSection;
