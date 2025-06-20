import React, { useState } from "react"
import {
  Search,
  Mail,
  Calendar,
  ToggleLeft,
  ToggleRight,
  Eye
} from "lucide-react"

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-01-10",
      status: "Active",
      orders: 5,
      totalSpent: 749.95,
      lastLogin: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-01-08",
      status: "Active",
      orders: 3,
      totalSpent: 299.97,
      lastLogin: "2024-01-14"
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      joinDate: "2024-01-05",
      status: "Inactive",
      orders: 2,
      totalSpent: 199.98,
      lastLogin: "2024-01-10"
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      joinDate: "2024-01-02",
      status: "Active",
      orders: 8,
      totalSpent: 1249.92,
      lastLogin: "2024-01-15"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleUserStatus = userId => {
    setUsers(
      users.map(user =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Inactive" : "Active"
            }
          : user
      )
    )
  }

  const viewUserDetails = user => {
    setSelectedUser(user)
    setShowModal(true)
  }

  const getStatusColor = status => {
    return status === "Active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <div className="text-sm text-gray-500">
          Total Users: {users.length} | Active:{" "}
          {users.filter(u => u.status === "Active").length}
        </div>
      </div>

      {/* Search */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="relative">
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
            size={20}
          />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Desktop Table View */}
<div className="hidden overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm sm:block">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="border-b border-gray-200 bg-gray-50">
        <tr>
          <th className="px-4 py-3 font-medium text-left text-gray-700">User</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Join Date</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Orders</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Total Spent</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Last Login</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Status</th>
          <th className="px-4 py-3 font-medium text-left text-gray-700">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="px-4 py-4">
              <div>
                <div className="font-medium text-gray-900">{user.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Mail size={12} className="mr-1" />
                  {user.email}
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-gray-600">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                {user.joinDate}
              </div>
            </td>
            <td className="px-4 py-4 text-sm">{user.orders} orders</td>
            <td className="px-4 py-4 font-medium text-gray-900">
              ₹{user.totalSpent.toFixed(2)}
            </td>
            <td className="px-4 py-4 text-gray-600">{user.lastLogin}</td>
            <td className="px-4 py-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                {user.status}
              </span>
            </td>
            <td className="px-4 py-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => viewUserDetails(user)}
                  className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                  title="View Details"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={() => toggleUserStatus(user.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    user.status === "Active" ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"
                  }`}
                  title={user.status === "Active" ? "Deactivate User" : "Activate User"}
                >
                  {user.status === "Active" ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

{/* Mobile Card View */}
<div className="space-y-4 sm:hidden">
  {filteredUsers.map(user => (
    <div key={user.id} className="p-4 space-y-2 bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-base font-semibold text-gray-900">{user.name}</div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail size={12} className="mr-1" />
            {user.email}
          </div>
        </div>
        <button
          onClick={() => viewUserDetails(user)}
          className="p-1 text-blue-600 transition-colors rounded hover:bg-blue-50"
        >
          <Eye size={18} />
        </button>
      </div>
      <div className="text-sm text-gray-600">
        <div className="flex items-center">
          <Calendar size={14} className="mr-1" />
          Joined: {user.joinDate}
        </div>
        <div>Orders: {user.orders}</div>
        <div>Total Spent: ₹{user.totalSpent.toFixed(2)}</div>
        <div>Last Login: {user.lastLogin}</div>
      </div>
      <div className="flex items-center justify-between">
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}
        >
          {user.status}
        </span>
        <button
          onClick={() => toggleUserStatus(user.id)}
          className={`p-2 rounded-lg text-sm font-medium transition-colors ${
            user.status === "Active" ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"
          }`}
        >
          {user.status === "Active" ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
        </button>
      </div>
    </div>
  ))}
</div>


      {/* User Details Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">User Details</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {selectedUser.name}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="text-gray-900">{selectedUser.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Join Date
                  </label>
                  <p className="text-gray-900">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Login
                  </label>
                  <p className="text-gray-900">{selectedUser.lastLogin}</p>
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Account Status
                </label>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      selectedUser.status
                    )}`}
                  >
                    {selectedUser.status}
                  </span>
                  <button
                    onClick={() => toggleUserStatus(selectedUser.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      selectedUser.status === "Active"
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {selectedUser.status === "Active"
                      ? "Deactivate Account"
                      : "Activate Account"}
                  </button>
                </div>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-blue-50">
                  <label className="block text-sm font-medium text-blue-700">
                    Total Orders
                  </label>
                  <p className="text-2xl font-bold text-blue-900">
                    {selectedUser.orders}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-green-50">
                  <label className="block text-sm font-medium text-green-700">
                    Total Amount Pay
                  </label>
                  <p className="text-2xl font-bold text-green-900">
                    ₹{selectedUser.totalSpent.toFixed(2)}
                  </p>
                </div>
              </div>

             
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserManagement
