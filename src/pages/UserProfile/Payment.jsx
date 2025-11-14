import { useState } from "react";
import { FaWhatsapp, FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import axiosInstance from "../../api/axiosInstance";
import { useEffect } from "react";

const Payment = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  // const [whatsApp, setWhatsApp] = useState({});

  // Mock order details (replace with actual data from your state management)
  // const whatsApp = {
  //   orderId: "WBC" + Math.random().toString(36).substr(2, 9).toUpperCase(),
  //   amount: 339.0,
  //   upiId: "wbccompany@upi",
  //   whatsappNumber: "919525694024", // Replace with your actual WhatsApp number
  // };

  // fetch price from cart page
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // If not authenticated, we can't fetch a server cart.
      if (!isAuthenticated()) {
        setLoading(false);
        return;
      }

      try {
        const response = await axiosInstance.post("/payment", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }); // Ensure you handle the API response structure correctly
        setCartItems(response.data.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails(); // Add isAuthenticated as a dependency to refetch if auth state changes
  }, [isAuthenticated]);

  if (loading) {
    return <div className="text-center py-20">Loading your cart...</div>;
  }

  const handleWhatsAppRedirect = () => {
    const message = encodeURIComponent(
      `Hello! I've made a payment for order ${orderDetails.orderId} of amount ₹${orderDetails.amount}. Attaching the payment screenshot.`
    );
    const whatsappUrl = `https://wa.me/${orderDetails.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setShowSuccess(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Complete Your Payment
        </h1>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Order ID</p>
              <p className="font-medium">{orderDetails.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Amount to Pay</p>
              <p className="text-xl font-bold text-[#8B0000]">
                ₹{orderDetails.amount}
              </p>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="/qr-code.jpg" // Replace with your actual QR code image
            alt="UPI Payment QR Code"
            className="w-64 h-64 border-2 border-gray-200 rounded-lg p-2 mb-4"
          />
          <p className="text-gray-600 font-medium">
            UPI ID: {orderDetails.upiId}
          </p>
        </div>

        {/* Payment Steps */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-600" />
            How to Pay
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700">
            <li>
              Open your UPI payment app (Google Pay, PhonePe, Paytm, etc.)
            </li>
            <li>Scan the QR code shown above</li>
            <li>Enter the exact amount: ₹{orderDetails.amount}</li>
            <li>Complete the payment in your UPI app</li>
            <li>Take a screenshot of the successful payment</li>
            <li>Click the WhatsApp button below to send us the screenshot</li>
          </ol>
        </div>

        {/* WhatsApp Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleWhatsAppRedirect}
            className="bg-green-500 text-white py-3 px-6 rounded-md hover:bg-green-600 transition-colors duration-300 flex items-center"
          >
            <FaWhatsapp className="text-xl mr-2" />
            Send Payment Screenshot on WhatsApp
          </button>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mt-6 bg-green-50 text-green-800 p-4 rounded-lg flex items-start">
            <FaCheckCircle className="text-green-500 text-xl mr-2 mt-1 flex-shrink-0" />
            <div>
              <p className="font-medium">Thank you for your payment!</p>
              <p className="text-sm mt-1">
                Your order will be successfully placed once we verify the
                payment. Please make sure to send us the payment screenshot
                through WhatsApp. We'll process your order immediately after
                verification.
              </p>
            </div>
          </div>
        )}

        {/* Important Notes */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-3">
            Important Notes:
          </h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
            <li>Make sure to enter the exact amount as shown above</li>
            <li>
              Keep the payment screenshot safe until your order is confirmed
            </li>
            <li>Send the payment screenshot within 30 minutes</li>
            <li>For any issues, contact our support team through WhatsApp</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Payment;
