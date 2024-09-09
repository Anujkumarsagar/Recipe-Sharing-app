import React, { useState } from 'react';
import { UserCircle, Pencil, Check } from 'lucide-react';

export default function Profile({ userLoggedIn }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Passionate home cook and recipe enthusiast.',
    location: 'New York, NY',
    joinDate: 'January 2023',
    recipesCreated: 15,
    favoriteCuisine: 'Italian',
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Typically, an API request to update the user's information would be sent here
    console.log('Saving user information:', user);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      {userLoggedIn ? <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-6">
            <UserCircle className="h-20 w-20 text-gray-400" />
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-gray-500">Member since {user.joinDate}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={user.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                value={user.bio}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                id="location"
                name="location"
                type="text"
                value={user.location}
                onChange={handleChange}
                disabled={!isEditing}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-2">Cooking Stats</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">{user.recipesCreated}</p>
                <p className="text-sm text-gray-500">Recipes Created</p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-2xl font-bold">{user.favoriteCuisine}</p>
                <p className="text-sm text-gray-500">Favorite Cuisine</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          ) : (
            <button
              onClick={handleEdit}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Pencil className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div> : (
        <div className="text-center text-gray-600">Please log in to view your profile.</div>
      )}
    </>
  );
}
