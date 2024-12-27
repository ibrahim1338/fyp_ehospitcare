import React, { useState } from "react";

function AdminProfile() {
  const [activeTab, setActiveTab] = useState("viewProfile");
  const [profile, setProfile] = useState({
    username: "AdminUser",
    email: "admin@example.com",
    profilePicture: "https://via.placeholder.com/150",
    phone: "123-456-7890",
    role: "Super Admin",
    employeeId: "EMP001",
    dateOfJoining: "2020-01-15",
  });
  const [updateFields, setUpdateFields] = useState({
    email: profile.email,
    phone: profile.phone,
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProfile((prev) => ({
      ...prev,
      email: updateFields.email,
      phone: updateFields.phone,
    }));
    if (updateFields.password) {
      alert("Password updated successfully!");
    }
    alert("Profile updated successfully!");
  };

  return (
    <div className="w-full p-6">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 mb-4">
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "viewProfile"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("viewProfile")}
        >
          View Profile
        </button>
        <button
          className={`px-6 py-2 text-lg ${
            activeTab === "updateProfile"
              ? "border-b-4 border-blue-500 text-blue-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("updateProfile")}
        >
          Update Profile
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex justify-center">
        {activeTab === "viewProfile" && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Admin Profile</h2>
            <div className="flex flex-col items-center">
              <img
                src={profile.profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
              />
              <table className="w-full bg-white border border-gray-300 text-left">
                <tbody>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Username</th>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {profile.username}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Email</th>
                    <td className="px-4 py-2 border-b border-gray-200">{profile.email}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Phone</th>
                    <td className="px-4 py-2 border-b border-gray-200">{profile.phone}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">Role</th>
                    <td className="px-4 py-2 border-b border-gray-200">{profile.role}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">
                      Employee ID
                    </th>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {profile.employeeId}
                    </td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border-b border-gray-200">
                      Date of Joining
                    </th>
                    <td className="px-4 py-2 border-b border-gray-200">
                      {profile.dateOfJoining}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "updateProfile" && (
          <div className="p-4 bg-gray-100 rounded-lg w-3/5">
            <h2 className="text-2xl mb-4">Update Profile</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={updateFields.email}
                  onChange={handleInputChange}
                  placeholder="Enter new email address"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={updateFields.phone}
                  onChange={handleInputChange}
                  placeholder="Enter new phone number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={updateFields.password}
                  onChange={handleInputChange}
                  placeholder="Enter new password"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminProfile;
