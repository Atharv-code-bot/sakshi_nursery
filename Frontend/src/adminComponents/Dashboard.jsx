import React, { useEffect, useState } from "react";
import { Package, ShoppingCart, Users } from "lucide-react";

const Dashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    totalUsers: 0 // you can update this when user count API is ready
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/dashboard/counts")
      .then(res => res.json())
      .then(data => {
        setDashboardStats({
          totalOrders: data.totalOrders,
          totalProducts: data.totalProducts,
          totalUsers: 0 // update when user count is available
        });
      })
      .catch(error => console.error("Error fetching dashboard stats:", error));
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: dashboardStats.totalProducts.toLocaleString(),
      icon: Package,
      color: "text-blue-600"
    },
    {
      label: "Total Orders",
      value: dashboardStats.totalOrders.toLocaleString(),
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      label: "Total Users",
      value: dashboardStats.totalUsers.toLocaleString(),
      icon: Users,
      color: "text-orange-600"
    }
  ];

  const recentOrders = [
    {
      id: "992145",
      customer: "Dipak Khaire",
      amount: "₹2000",
      status: "Pending",
      date: "2024-01-15"
    },
    {
      id: "992146",
      customer: "Amol Khiare",
      amount: "₹1500",
      status: "Pending",
      date: "2024-01-14"
    },
    {
      id: "992147",
      customer: "Sumit Kale",
      amount: "₹1000",
      status: "Pending",
      date: "2024-01-14"
    },
    {
      id: "992186",
      customer: "Raj Kale",
      amount: "₹2500",
      status: "Pending",
      date: "2024-01-13"
    }
  ];

  const topProducts = [
    { name: "Aryaman", sales: 156, price: "₹1.50" },
    { name: "Armar", sales: 143, price: "₹1.50" },
    { name: "2048", sales: 98, price: "₹1.40" },
    { name: "Shark-1", sales: 87, price: "₹1.40" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 space-y-6 sm:p-6">
      {/* Top Title */}
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="p-6 transition-shadow bg-green-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <Icon size={24} className={stat.color} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders and Products */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Orders */}
        <div className="bg-green-50 border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Coming Orders</h2>
          </div>
          <div className="p-4 space-y-4 sm:p-6">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col p-4 rounded-lg sm:flex-row sm:items-center sm:justify-between bg-gray-50"
              >
                <div className="space-y-1">
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-600">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div className="mt-2 text-right sm:mt-0">
                  <p className="font-medium text-gray-900">{order.amount}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-green-50 border border-gray-200 rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200 sm:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Top Selling Plants</h2>
          </div>
          <div className="p-4 space-y-4 sm:p-6">
            {topProducts.map((product, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">{product.sales} Total Customers</p>
                </div>
                <p className="font-medium text-green-600">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
