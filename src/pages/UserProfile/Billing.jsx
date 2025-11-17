import { useState, useEffect, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const Billing = () => {
  const { productId } = useParams();
  const [searchParams] = useSearchParams();
  const sellerPhone = searchParams.get("sellerPhone");

  // Product state
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });

  // Fetch Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(`/products/${productId}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Error fetching product", err);
      }
    };

    fetchProduct();
  }, [productId]);

  // Billing form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "upi",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // --- PRICE CALCULATIONS --- //
  const taxRate = 8; // %

  const { price, taxAmount, totalAmount } = useMemo(() => {
    const priceNum = Number(product?.price) || 0;
    const tax = (priceNum * taxRate) / 100;
    return {
      price: priceNum,
      taxAmount: Math.round(tax),
      totalAmount: Math.round(priceNum + tax),
    };
  }, [product]);

  // Redirect to WhatsApp
  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();

    const { fullName, email, phone, address, city, state, pincode } = formData;

    const message = `
Hello, I want to buy this product:

Product: ${product.name}
Price: ₹${price}
Tax (${taxRate}%): ₹${taxAmount}
Total: ₹${totalAmount}

Shipping Details:
${fullName}
${email}
${phone}
${address}
${city}, ${state} - ${pincode}

Please confirm the order.
    `;

    const encoded = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${sellerPhone}?text=${encoded}`, "_blank");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Billing Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Billing Details
            </h2>

            <form
              onSubmit={handleWhatsAppRedirect}
              id="billing-form"
              className="space-y-6"
            >
              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "fullName", label: "Full Name", type: "text" },
                    { id: "email", label: "Email", type: "email" },
                    { id: "phone", label: "Phone Number", type: "tel" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label} *
                      </label>
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.id}
                        required
                        value={formData[field.id]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B0000]"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="text-lg font-medium text-gray-900">
                  Shipping Address
                </h3>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  required
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B0000]"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {["city", "state", "pincode"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)} *
                      </label>
                      <input
                        type="text"
                        id={field}
                        name={field}
                        required
                        value={formData[field]}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B0000]"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{price}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Tax ({taxRate}%)</span>
                <span>₹{taxAmount}</span>
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
            </div>

            <button
              type="submit"
              form="billing-form"
              className="w-full mt-6 bg-gradient-to-r from-[#6A0DAD] to-[#9B59B6] rounded text-white py-3 px-4 rounded-md hover:bg-[#660000] transition"
            >
              Make Payment through WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
