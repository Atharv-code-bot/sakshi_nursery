import React, { useState, useEffect } from "react"
import { Search, Eye, Package, Truck, CheckCircle } from "lucide-react"

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/orders/AllOrders")
      .then(res => res.json())
      .then(data => {
        const formatted = data.map(order => ({
          id: `${order.orderID}`,
          customer: order.customerName,
          total: parseFloat(order.totalPrice),
          status: capitalize(order.status),
          date: formatDate(order.bookingDate),
          items: [{
            name: order.productName,
            quantity: order.quantity,
            price: parseFloat(order.price)
          }],
          address: order.address,
          bookingDate: order.bookingDate,
          deliveryDate: order.deliveryDate,
          paymentStatus: order.paymentStatus,
          productName: order.productName,
          quantity: order.quantity,
          price: parseFloat(order.price),
          totalPrice: parseFloat(order.totalPrice)
        }))
        setOrders(formatted)
      })
      .catch(err => console.error("Failed to fetch orders:", err))
  }, [])

  const formatDate = dateStr => new Date(dateStr).toLocaleDateString()
  const capitalize = s => s?.charAt(0).toUpperCase() + s?.slice(1).toLowerCase()

  const filteredOrders = orders.filter(order =>
    [order.id, order.customer].some(field =>
      field?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const getStatusColor = status => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800"
      case "Processing": return "bg-blue-100 text-blue-800"
      case "Shipped": return "bg-purple-100 text-purple-800"
      case "Delivered": return "bg-green-100 text-green-800"
      case "Canceled": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = status => {
    switch (status) {
      case "Pending":
      case "Processing": return Package
      case "Shipped": return Truck
      case "Delivered": return CheckCircle
      default: return Package
    }
  }

 const updateOrderStatus = async (orderId, productName, newStatus) => {
  try {
    const order = orders.find(o => o.id === orderId && o.productName === productName)
    if (!order) throw new Error("Order not found")

    const payload = {
      orderID: orderId,
      productname: productName,
      newstatus: newStatus.toUpperCase()
    }

    const response = await fetch("http://localhost:8080/api/admin/orders/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to update order status: ${errorText}`)
    }

    const text = await response.text()
    console.log("Success response:", text)

    setOrders(prev =>
      prev.map(order =>
        order.id === orderId && order.productName === productName
          ? { ...order, status: capitalize(newStatus) }
          : order
      )
    )
  } catch (error) {
    console.error("Error updating status:", error)
    alert("Failed to update status. Please try again.")
  }
}


  const viewOrderDetails = order => {
    setSelectedOrder(order)
    setShowModal(true)
  }

  return (
    <div className="px-4 space-y-6 sm:px-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <div className="mt-2 text-sm text-gray-500 sm:mt-0">
          Total Orders: {orders.length}
        </div>
      </div>

      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6">
        <div className="relative">
          <Search className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2" size={20} />
          <input
            type="text"
            placeholder="Search orders by ID, customer..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-x-auto bg-white border border-gray-200 rounded-lg shadow-sm sm:block">
        <table className="min-w-full text-sm text-left">
          <thead className="font-medium text-gray-600 bg-gray-50">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Order Date</th>
              <th className="px-4 py-3">Customer Advance</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(order => {
              const StatusIcon = getStatusIcon(order.status)
              return (
<tr key={`${order.id}-${order.productName}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{order.id}</td>
                  <td className="px-4 py-3">{order.customer}</td>
                  <td className="px-4 py-3">{order.date}</td>
                  <td className="px-4 py-3">₹{order.total.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      <StatusIcon size={12} className="mr-1" />
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                      <button onClick={() => viewOrderDetails(order)} className="p-2 text-blue-600 rounded-lg hover:bg-blue-50">
                        <Eye size={16} />
                      </button>
                     <select
  value={order.status.toUpperCase()}
  onChange={e => updateOrderStatus(order.id, order.productName, e.target.value)}
  className="px-2 py-1 text-xs border border-gray-300 rounded"
>
  <option value="PENDING">PENDING</option>
  <option value="SHIPPED">SHIPPED</option>
  <option value="DELIVERED">DELIVERED</option>
  <option value="CANCELED">CANCELED</option>
</select>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 sm:hidden">
        {filteredOrders.map(order => {
          const StatusIcon = getStatusIcon(order.status)
          return (
<div key={`${order.id}-${order.productName}`} className="p-4 bg-white border rounded-lg shadow-sm">
              <div className="flex justify-between mb-2">
                <div className="font-semibold text-blue-600">{order.id}</div>
                <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  <StatusIcon size={12} className="mr-1" />
                  {order.status}
                </span>
              </div>
              <div className="text-sm text-gray-700">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Date:</strong> {order.date}</p>
                <p><strong>Advance:</strong> ₹{order.total.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <button onClick={() => viewOrderDetails(order)} className="flex items-center text-sm text-blue-600">
                  <Eye size={16} className="mr-1" /> View
                </button>
               <select
  value={order.status.toUpperCase()}
  onChange={e => updateOrderStatus(order.id, order.productName, e.target.value)}
  className="px-2 py-1 text-xs border border-gray-300 rounded"
>
  <option value="PENDING">PENDING</option>
  <option value="SHIPPED">SHIPPED</option>
  <option value="DELIVERED">DELIVERED</option>
  <option value="CANCELED">CANCELED</option>
</select>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Order Details</h2>
              <button onClick={() => setShowModal(false)} className="text-2xl text-gray-400 hover:text-gray-600">&times;</button>
            </div>
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="font-medium">Order ID</label><p>{selectedOrder.id}</p></div>
                <div><label className="font-medium">Order Date</label><p>{selectedOrder.date}</p></div>
                <div><label className="font-medium">Customer</label><p>{selectedOrder.customer}</p></div>
              </div>
              <div>
                <label className="font-medium">Status</label>
                <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedOrder.status)}`}>
                  {React.createElement(getStatusIcon(selectedOrder.status), { size: 14, className: "mr-1" })}
                  {selectedOrder.status}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div><label className="font-medium">Address</label><p>{selectedOrder.address}</p></div>
                <div><label className="font-medium">Booking Date</label><p>{formatDate(selectedOrder.bookingDate)}</p></div>
                <div><label className="font-medium">Delivery Date</label><p>{formatDate(selectedOrder.deliveryDate)}</p></div>
                <div><label className="font-medium">Payment Status</label><p>{selectedOrder.paymentStatus}</p></div>
                <div><label className="font-medium">Product</label><p>{selectedOrder.productName}</p></div>
                <div><label className="font-medium">Quantity</label><p>{selectedOrder.quantity}</p></div>
                <div><label className="font-medium">Price</label><p>₹{selectedOrder.price.toFixed(2)}</p></div>
                <div><label className="font-medium">Total</label><p>₹{selectedOrder.totalPrice.toFixed(2)}</p></div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderManagement