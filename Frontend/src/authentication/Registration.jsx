import React, { useState } from "react";
import Google from "../images/google.png";
import FarmerImage from "../images/Registration.jpg";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    alert("Registration successful");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-green-50 to-green-200 flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row bg-white shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">
        
        {/* Left image side */}
        <div className="hidden lg:block lg:w-1/2">
          <img
            src={FarmerImage}
            alt="Farmer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right registration form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-10">
          <h1 className="text-3xl font-bold text-green-700 text-center mb-2">Sakshi Nursery</h1>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Create your account and start your nursery journey!
          </p>

          {error && <p className="text-red-600 text-center mb-3 text-sm">{error}</p>}

          {/* Google Sign-up button (UI only) */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-3 rounded-lg hover:border-green-500 transition mb-5 text-sm shadow-sm">
            <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
            Sign up with Google
          </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition"
            >
              Register
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 hover:underline">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
