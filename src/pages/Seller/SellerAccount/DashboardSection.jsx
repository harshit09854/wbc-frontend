import React from "react";
import { Package, DollarSign, Clock } from "lucide-react";

const DashboardSection = ({ dashboardData }) => {
  const stats = [
    {
      label: "Total Products",
      value: dashboardData.totalProducts,
      icon: <Package className="text-purple-500 w-6 h-6" />,
      color: "from-purple-100 to-purple-200",
    },
    {
      label: "Monthly Sales",
      value: dashboardData.monthlySales,
      icon: <DollarSign className="text-green-500 w-6 h-6" />,
      color: "from-green-100 to-green-200",
    },
    {
      label: "Pending Orders",
      value: dashboardData.pendingOrders,
      icon: <Clock className="text-yellow-500 w-6 h-6" />,
      color: "from-yellow-100 to-yellow-200",
    },
  ];

  return (
    <section className="mb-10">
      <h2 className="text-3xl font-semibold  text-gray-800 flex items-center gap-2 mb-10 ">
        📊 Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-medium text-gray-700">{item.label}</h3>
              <div className="bg-white p-2 rounded-lg shadow-sm">{item.icon}</div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DashboardSection;
