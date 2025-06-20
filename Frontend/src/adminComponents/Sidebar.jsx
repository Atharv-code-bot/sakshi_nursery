

import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar({ sidebarCollapsed }) {
  const linkClass =
    "block py-2 px-4 text-gray-700 hover:bg-gray-100 rounded transition";

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-full bg-white border-r shadow transform transition-transform duration-300 ease-in-out
      ${sidebarCollapsed ? "-translate-x-full" : "translate-x-0"}
      lg:translate-x-0`}
    >
      <h2 className="p-4 text-xl font-bold text-gray-800 border-b">
        Admin Panel
      </h2>
      <nav className="flex flex-col gap-3 px-2 mt-4">
        <NavLink to="/admin" className={linkClass}>🏠 Dashboard</NavLink>
        <NavLink to="/admin/products" className={linkClass}>🛍 Products</NavLink>
        <NavLink to="/admin/orders" className={linkClass}>📦 Orders</NavLink>
        <NavLink to="/admin/users" className={linkClass}>👤 Users</NavLink>
        <NavLink to="/admin/transactions" className={linkClass}>
  💸 Transactions
</NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;