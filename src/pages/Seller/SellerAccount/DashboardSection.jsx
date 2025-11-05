import React from "react";

const DashboardSection = ({ dashboardData }) => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">📊 Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Total Products</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.totalProducts}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Monthly Sales</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.monthlySales}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-lg font-medium">Pending Orders</h3>
          <p className="text-2xl font-bold text-purple-600">
            {dashboardData.pendingOrders}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardSection;