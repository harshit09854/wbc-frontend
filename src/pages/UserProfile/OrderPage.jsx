import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // make sure this is correctly imported

const OrderPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Simulate fetching orders from localStorage or an API
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleStartShopping = () => {
    if (isAuthenticated()) {
      navigate("/products");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 py-10 px-4">
      {orders.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
              alt="No orders"
              className="mx-auto w-40 h-40 mb-6"
            />
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              You have no orders
            </h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven’t placed any orders yet.
            </p>
            <button
              onClick={handleStartShopping}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-all"
            >
              Start Shopping
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h2>
          <div className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Order #{order.id || index + 1}
                </h3>
                <ul className="list-disc list-inside text-gray-600">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.name} — ₹{item.price} × {item.quantity}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-gray-500">
                  Total: ₹
                  {order.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
