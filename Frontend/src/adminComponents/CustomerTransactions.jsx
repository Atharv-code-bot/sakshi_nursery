import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CSVLink } from "react-csv";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const CustomerTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10;

  useEffect(() => {
    const mockData = [
      { id: 1, customerName: "Alice", upiId: "alice@upi", amount: 100, status: "SUCCESS", date: "2024-06-10" },
      { id: 2, customerName: "Bob", upiId: "bob@upi", amount: 50, status: "FAILED", date: "2024-06-12" },
      { id: 3, customerName: "Charlie", upiId: "charlie@upi", amount: 75, status: "PENDING", date: "2024-06-14" },
      { id: 4, customerName: "David", upiId: "david@upi", amount: 200, status: "SUCCESS", date: "2024-06-17" },
    ];
    setTransactions(mockData);
  }, []);

  const filtered = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    const matchesDate =
      (!startDate || txnDate >= startDate) && (!endDate || txnDate <= endDate);
    const matchesStatus = !statusFilter || txn.status.toUpperCase() === statusFilter;
    const matchesSearch =
      txn.customerName.toLowerCase().includes(search.toLowerCase()) ||
      txn.upiId.toLowerCase().includes(search.toLowerCase());

    return matchesSearch && matchesDate && matchesStatus;
  });

  const paginated = filtered.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  const totalPages = Math.ceil(filtered.length / transactionsPerPage);

  const revenueData = filtered.reduce((acc, txn) => {
    const date = new Date(txn.date).toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + txn.amount;
    return acc;
  }, {});

  const chartData = Object.keys(revenueData).map((date) => ({
    date,
    revenue: revenueData[date],
  }));

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">📊 Customer Transactions</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by UPI ID or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        />
        {/* <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          placeholderText="Start Date"
          className="p-2 border rounded w-full sm:w-auto"
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          placeholderText="End Date"
          className="p-2 border rounded w-full sm:w-auto"
        /> */}
        {/* <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded w-full sm:w-auto"
        >
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
          <option value="PENDING">Pending</option>
        </select> */}
        <CSVLink
          data={filtered}
          filename={"transactions.csv"}
          className="px-4 py-2 bg-blue-600 text-white rounded text-center"
        >
          Export CSV
        </CSVLink>
      </div>

      {/* Table */}
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border rounded">
          <thead className="bg-gray-100 text-sm sm:text-base">
            <tr>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">UPI ID</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((txn) => (
              <tr key={txn.id} className="text-sm sm:text-base">
                <td className="p-2 border">{txn.customerName}</td>
                <td className="p-2 border">{txn.upiId}</td>
                <td className="p-2 border">₹{txn.amount}</td>
                <td className="p-2 border">{txn.status}</td>
                <td className="p-2 border">{txn.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-2 flex-wrap mb-4 text-sm sm:text-base">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-2 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-100"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-2 py-1 bg-gray-200 rounded"
        >
          Next
        </button>
      </div>

      {/* Revenue Chart */}
      <h3 className="text-lg font-semibold mb-2">📈 Revenue Chart</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="revenue" stroke="#4F46E5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomerTransactions;
