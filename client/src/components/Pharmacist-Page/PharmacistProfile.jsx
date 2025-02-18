import React, { useState } from 'react';

function PharmacistProfile() {
 const [name, setName] = useState('Peter David');
   const [email, setEmail] = useState('peterdavid@gmail.com');
   const [phone, setPhone] = useState('0912893402');
   const [address, setAddress] = useState('Jakpa road');
   const [profilePicture, setProfilePicture] = useState(null);
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
 
   const handleProfileUpdate = () => {
     // Handle profile update logic, e.g., send data to server
     console.log('Profile updated:', { name, email, phone, address, profilePicture });
   };
 
   const handlePasswordChange = () => {
     if (newPassword !== confirmPassword) {
       alert('New password and confirm password do not match');
       return;
     }
     // Handle password change logic, e.g., send data to server
     console.log('Password changed:', { oldPassword, newPassword });
   };
 
   const handleProfilePictureChange = (event) => {
     setProfilePicture(event.target.files[0]);
   };
 
   return (
     <div className="w-full p-4">
       <div className="flex flex-col md:flex-row gap-4">
         {/* Profile Editing Section */}
         <div className="profile-section bg-white p-4 rounded-lg shadow-md flex-1">
           <h2 className="text-2xl mb-4">Edit Profile</h2>
           <form>
             <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
             <input
               type="text"
               id="name"
               className="w-full px-4 py-2 border rounded-lg"
               value={name}
               onChange={(e) => setName(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
             <input
               type="email"
               id="email"
               className="w-full px-4 py-2 border rounded-lg"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
             <input
               type="text"
               id="phone"
               className="w-full px-4 py-2 border rounded-lg"
               value={phone}
               onChange={(e) => setPhone(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="address">Address</label>
             <input
               type="text"
               id="address"
               className="w-full px-4 py-2 border rounded-lg"
               value={address}
               onChange={(e) => setAddress(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="profilePicture">Profile Picture</label>
             <input
               type="file"
               id="profilePicture"
               className="w-full px-4 py-2 border rounded-lg"
               onChange={handleProfilePictureChange}
             />
             <button type="button" className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg" onClick={handleProfileUpdate}>
               Update Profile
             </button>
           </form>
         </div>
 
         {/* Password Change Section */}
         <div className="password-section bg-white p-4 rounded-lg shadow-md flex-1">
           <h2 className="text-2xl mb-4">Change Password</h2>
           <form>
             <label className="block text-gray-700 mb-2" htmlFor="oldPassword">Old Password</label>
             <input
               type="password"
               id="oldPassword"
               className="w-full px-4 py-2 border rounded-lg"
               value={oldPassword}
               onChange={(e) => setOldPassword(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="newPassword">New Password</label>
             <input
               type="password"
               id="newPassword"
               className="w-full px-4 py-2 border rounded-lg"
               value={newPassword}
               onChange={(e) => setNewPassword(e.target.value)}
             />
             <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">Confirm New Password</label>
             <input
               type="password"
               id="confirmPassword"
               className="w-full px-4 py-2 border rounded-lg"
               value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}
             />
             <button type="button" className="bg-blue-500 text-white px-6 py-2 mt-4 rounded-lg" onClick={handlePasswordChange}>
               Update Password
             </button>
           </form>
         </div>
       </div>
     </div>
   );
}

export default PharmacistProfile