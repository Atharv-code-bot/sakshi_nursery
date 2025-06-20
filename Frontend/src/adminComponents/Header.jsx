

import React from "react";
import { Bell, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  return (
    <header className="relative z-20 px-4 py-4 bg-white border-b border-gray-200 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Left Section: Hamburger + Brand */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 transition rounded-lg lg:hidden hover:bg-gray-100"
          >
            <Menu size={20} />
          </button>

          {/* Logo or Brand */}
          <h1 className="text-xl font-bold text-green-700 sm:text-2xl whitespace-nowrap">
            Sakshi Hi-tech Nursery
          </h1>
        </div>

        {/* Right Section: Notifications + User */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Notification Bell */}
          <button className="relative p-2 transition rounded-lg hover:bg-gray-100">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
              3
            </span>
          </button>

         {/* User Info */}
<Link to="/admin/profile" className="flex items-center space-x-2 cursor-pointer hover:opacity-80">
  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
    <User size={18} className="text-white" />
  </div>
  <span className="hidden text-sm font-medium text-gray-700 sm:inline">
    Admin User
  </span>
</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;