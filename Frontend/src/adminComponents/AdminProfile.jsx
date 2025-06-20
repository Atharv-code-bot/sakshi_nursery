import React, { useState } from "react";

const AdminProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    image: "",
    role: "ADMIN"
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
    console.log("Admin Profile Updated:", profile);
    alert("Admin profile saved successfully!");
  };

  return (
    <div className="bg-gray-50 py-10 px-4 md:px-8 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white p-6 md:p-12 rounded-lg shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 md:mb-8">
          Admin Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Profile Image */}
          <div className="flex justify-center flex-col items-center mb-6">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-blue-200 flex items-center justify-center overflow-hidden"
              style={{
                backgroundImage: `url(${profile.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {!profile.image && <span className="text-white text-4xl md:text-6xl">👨‍💼</span>}
            </div>
            <div className="mt-4">
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="text-sm text-gray-700"
              />
            </div>
          </div>

          {/* Info Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="Enter your phone"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={profile.dob}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
                className="w-full p-3 border border-gray-200 bg-gray-100 rounded-lg cursor-not-allowed"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white p-4 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
