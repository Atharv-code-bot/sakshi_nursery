// src/App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Auth Pages
import Login from "./authentication/Login";
import Register from "./authentication/Registration";
import ForgotPassword from "./authentication/ForgotPassword";

// Admin Components
import Sidebar from "./adminComponents/Sidebar";
import Header from "./adminComponents/Header";
import Dashboard from "./adminComponents/Dashboard";
import ProductManagement from "./adminComponents/ProductManagement";
import OrderManagement from "./adminComponents/OrderManagement";
import UserManagement from "./adminComponents/UserManagement";
import CustomerTransactions from "./adminComponents/CustomerTransactions";
import AdminProfile  from "./adminComponents/AdminProfile"

// Public Components
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import Home from "./pages/Home";
import ProductCard from "./components/ProductCard";
import Customer from "./components/Customer";
import UniqueFeature from "./components/UniqueFeature";
import WhatsAppChat from "./components/WhatsAppChat";

// Vegetables
import Cauliflower from "./pages/vegetables/Cauliflower";
import Papaya from "./pages/vegetables/Papaya";
import Brinjal from "./pages/vegetables/Brinjal";
import LadyFinger from "./pages/vegetables/LadyFinger";
import Cabbage from "./pages/vegetables/Cabbage";
import BottleGourd from "./pages/vegetables/BottleGourd";
import BitterGourd from "./pages/vegetables/BitterGourd";
import Tomato from "./pages/vegetables/Tomato";
import Chilli from "./pages/vegetables/Chilli";
import Capsicum from "./pages/vegetables/Capsicum";
import Watermelon from "./pages/vegetables/Watermelon";
import Muskmelon from "./pages/vegetables/Muskmelon";
import Cucumber from "./pages/vegetables/Cucumber";
import Drumstick from "./pages/vegetables/Drumstick";
import SmallCucumber from "./pages/vegetables/SmallCucumber";
import Merigold from "./pages/vegetables/Merigold";

// Info Pages
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Infrastructure from "./pages/Infrastructure";
import Team from "./pages/Team";
import Phases from "./pages/Phases";
import BookingPhase from "./pages/phases/BookingPhase";
import SowingPhase from "./pages/phases/SowingPhase";
import PlantPreparation from "./pages/phases/PlantPreparation";
import CustomerVisitPhase from "./pages/phases/CustomerVisitPhase";
import PlantDelivery from "./pages/phases/PlantDelivery";
import Profile from "./pages/Profile";

const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      // Replace with API auth check
      const isAuthenticated = true; // Set to true if user is logged in
      if (isAuthenticated) {
        setUserRole("ADIN"); // or "USER"
        setUsername("dipak");
      } else {
        setUserRole(null);
        setUsername(null);
      }
    };
    fetchUserRole();
  }, []);

  // Show auth pages if not logged in
  if (!userRole || !username) {
    return (
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/register" />} />
      </Routes>
    );
  }

  // ------------------- ADMIN LAYOUT -------------------
  if (userRole === "ADMIN" && username === "dipak") {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar sidebarCollapsed={sidebarCollapsed} />
        {!sidebarCollapsed && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-30 lg:hidden"
            onClick={() => setSidebarCollapsed(true)}
          />
        )}
        <div className="flex-1 lg:ml-64 transition-all duration-300">
          <Header
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
          />
          <main className="p-6">
            <Routes>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/transactions" element={<CustomerTransactions />} />
              <Route path="/admin/profile" element={<AdminProfile />} />
              <Route path="*" element={<Navigate to="/admin" />} />
            </Routes>
          </main>
        </div>
      </div>
    );
  }

  // ------------------- PUBLIC LAYOUT -------------------
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/team" element={<Team />} />
        <Route path="/phases" element={<Phases />} />
        <Route path="/profile" element={<Profile />} />

        {/* Vegetable Routes */}
        <Route path="/vegetable/cauliflower" element={<Cauliflower />} />
        <Route path="/vegetable/papaya" element={<Papaya />} />
        <Route path="/vegetable/brinjal" element={<Brinjal />} />
        <Route path="/vegetable/lady-finger" element={<LadyFinger />} />
        <Route path="/vegetable/cabbage" element={<Cabbage />} />
        <Route path="/vegetable/bottle-gourd" element={<BottleGourd />} />
        <Route path="/vegetable/bitter-gourd" element={<BitterGourd />} />
        <Route path="/vegetable/tomato" element={<Tomato />} />
        <Route path="/vegetable/chilli" element={<Chilli />} />
        <Route path="/vegetable/capsicum" element={<Capsicum />} />
        <Route path="/vegetable/watermelon" element={<Watermelon />} />
        <Route path="/vegetable/muskmelon" element={<Muskmelon />} />
        <Route path="/vegetable/cucumber" element={<Cucumber />} />
        <Route path="/vegetable/small-cucumber" element={<SmallCucumber />} />
        <Route path="/vegetable/drumstick" element={<Drumstick />} />
        <Route path="/vegetable/merigold" element={<Merigold />} />

        {/* Phases */}
        <Route path="/phases/booking" element={<BookingPhase />} />
        <Route path="/phases/sowing" element={<SowingPhase />} />
        <Route path="/phases/preparing" element={<PlantPreparation />} />
        <Route path="/phases/visit" element={<CustomerVisitPhase />} />
        <Route path="/phases/delivered" element={<PlantDelivery />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
};

// Home layout grouped for cleanliness
const HomeLayout = () => (
  <>
    <Home />
    <ProductCard />
    <Customer />
    <UniqueFeature />
    <WhatsAppChat />
  </>
);

export default App;
