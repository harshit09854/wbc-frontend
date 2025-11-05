import React from "react";

const SupportSection = () => {
  const messages = [
    {
      id: 1,
      from: "Customer Support",
      subject: "Welcome to Seller Panel!",
      date: "2025-01-15",
    },
    {
      id: 2,
      from: "Buyer Query",
      subject: "Product Size Information",
      date: "2025-01-14",
    },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">💬 Messages / Support</h2>
      <div className="bg-white rounded-xl shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Your Messages</h3>
        </div>
        <div className="p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium text-gray-900">{message.from}</h4>
                  <p className="text-gray-600">{message.subject}</p>
                </div>
                <span className="text-sm text-gray-500">{message.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;