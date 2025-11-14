import React from "react";

const OrdersSection = () => {
  const orders = [
    {
      id: "ORD001",
      customer: "Priya Sharma",
      product: "Handmade Earrings",
      amount: "₹499",
      status: "Pending",
    },
    {
      id: "ORD002",
      customer: "Anjali Patel",
      product: "Silk Saree",
      amount: "₹2,999",
      status: "Shipped",
    },
    {
      id: "ORD003",
      customer: "Meera Reddy",
      product: "Designer Handbag",
      amount: "₹1,799",
      status: "Delivered",
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📦 Orders</h2>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">Customer</th>
              <th className="px-4 py-2 text-left">Product</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">{order.customer}</td>
                <td className="px-4 py-2">{order.product}</td>
                <td className="px-4 py-2">{order.amount}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Shipped"
                      ? "text-blue-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrdersSection;
