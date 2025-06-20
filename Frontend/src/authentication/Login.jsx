import React, { useState } from "react";
import Google from '../images/google.png';
import FarmerImage from '../images/LoginImage.jpg'; // your left side image

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      setError("Please fill in both fields.");
      return;
    }

    if (username === "admin@sakshinursery.com" && password === "password123") {
      setError("");
      alert("Login successful");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-10 ">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 max-w-4xl w-full">
        
        {/* Left side image */}
        <div className="w-full lg:w-1/2 h-64 lg:h-auto">
          <img
            src={FarmerImage}
            alt="Farmer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right side login form */}
        <div className="w-full lg:w-1/2 p-6">
          <h1 className="text-center text-2xl font-bold text-green-700 mb-2 mt-18">Sakshi Nursery</h1>
          <p className="text-center text-gray-600 mb-4 text-sm">
            Login to continue your journey with us.
          </p>

          {error && <p className="text-red-600 text-center mb-3 text-sm">{error}</p>}

          {/* Google Button (UI only) */}
          <button className="w-full flex items-center justify-center border border-gray-300 py-2 px-3 rounded-md hover:border-green-500 transition mb-4 text-sm">
            <img src={Google} alt="Google" className="w-5 h-5 mr-2" />
            Sign in with Google
          </button>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="username"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm"
                placeholder="admin@sakshinursery.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md text-sm"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center text-sm mb-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Remember Me
              </label>
              <a href="/forgot-password" className="text-green-600 hover:underline">Forgot?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm"
            >
              Login
            </button>
          </form>

          <div className="text-center mt-3 text-sm">
            Don't have an account?{" "}
            <a href="/register" className="text-green-600 hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
