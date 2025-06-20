import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    farmName: "",
    farmLocation: "",
    farmSize: "",
    farmingType: "",
    crops: "",
    livestock: "",
    irrigationSystem: "",
    soilType: "",
    fertilizersUsed: "",
    experience: "",
    skills: "",
    equipment: "",
    toolsNeeded: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, image: URL.createObjectURL(file) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Updated:", profile);
    alert("Profile saved successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl bg-white p-6 md:p-12 rounded-lg shadow-xl">
        {/* Header with Logout */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-900">
            Farmer Profile
          </h2>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-red-500 transition duration-300"
          >
            Logout
          </button>
        </div>

        {/* ...your form continues here... */}

         <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center flex-col items-center mb-8">
            <div
              className="w-48 h-48 rounded-full bg-green-200 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url(${profile.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!profile.image && (
                <span className="text-white text-6xl">👨‍🌾</span>
              )}
            </div>
            {/* File Upload Button Below the Image */}
            <div className="mt-4">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="bg-white text-black p-2 rounded-full cursor-pointer text-center border border-black"
              />
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-800 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Gender</label>
                <select
                  name="gender"
                  value={profile.gender}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={profile.dob}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          {/* Farm Details */}
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-900 mb-4">Farm Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 mb-2">Farm Name</label>
                <input
                  type="text"
                  name="farmName"
                  value={profile.farmName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your farm name"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Farm Location</label>
                <input
                  type="text"
                  name="farmLocation"
                  value={profile.farmLocation}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your farm location"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Farm Size</label>
                <input
                  type="text"
                  name="farmSize"
                  value={profile.farmSize}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter farm size (e.g., 5 acres)"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Type of Farming</label>
                <select
                  name="farmingType"
                  value={profile.farmingType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select</option>
                  <option value="Crop Farming">Crop Farming</option>
                  <option value="Livestock Farming">Livestock Farming</option>
                  <option value="Organic Farming">Organic Farming</option>
                  <option value="Mixed Farming">Mixed Farming</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Crops Grown</label>
                <input
                  type="text"
                  name="crops"
                  value={profile.crops}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter crops grown"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Livestock</label>
                <input
                  type="text"
                  name="livestock"
                  value={profile.livestock}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter details about livestock"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Irrigation System</label>
                <input
                  type="text"
                  name="irrigationSystem"
                  value={profile.irrigationSystem}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter irrigation system used"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Soil Type</label>
                <input
                  type="text"
                  name="soilType"
                  value={profile.soilType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter soil type"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-2">Fertilizers Used</label>
                <input
                  type="text"
                  name="fertilizersUsed"
                  value={profile.fertilizersUsed}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter fertilizers used"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white p-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
