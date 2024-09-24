import React, { useState, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, updateProfile } from '../store/userSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, error, theme = 'light' } = useSelector((state) => state.user);
// console.log("currentUser", currentUser.Object);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    userName: '',
    email: '',
    bio: '',
    location: '',
    contactNumber: '',
    profilePic: '',
    profilePicFile: null,
  });

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (currentUser) {
      setEditedUser({ 
        userName: currentUser.userName || editedUser.userName , 
        email: currentUser.email || editedUser.email , 
        bio: currentUser.bio || editedUser.bio , 
        location: currentUser.location || editedUser.location , 
        contactNumber: currentUser.contactNumber || editedUser.contactNumber , 
        profilePic: currentUser.profilePic || editedUser.profilePic , 
        profilePicFile: editedUser.profilePicFile || null 
      });
    }
  }, [currentUser]);
  
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const profileData = {
      userName: editedUser?.userName,
      email: editedUser?.email,
      bio: editedUser?.bio,
      location: editedUser?.location,
      contactNumber: editedUser.contactNumber,
      profilePicFile: editedUser.profilePicFile || null,
    };

    // Log the profileData to check its contents
    console.log("profileData", profileData);
    const resultAction = await dispatch(updateProfile(profileData));
    if (updateProfile.fulfilled.match(resultAction)) {
      setIsEditing(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({ ...prev, profilePic:  file }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center text-gray-600">Please log in to view your profile.</div>;
  }

  if (!currentUser) {
    return <div className="text-center text-gray-600">Unable to load user profile. Please try again later.</div>;
  }

  return (
    <form className={`max-w-4xl mx-auto shadow-md rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} onSubmit={handleSave}>
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-6">
          <img 
            src={editedUser.profilePic || currentUser.profilePic} 
            alt="Profile" 
            className="h-20 w-20 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{editedUser.userName}</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Member since {new Date(currentUser?.createdAt).toLocaleDateString()}</p>
            {isEditing && (
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange}
                className="mt-2"
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium">Name</label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={editedUser.userName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 font-bold mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black`}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={editedUser.email}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 font-bold mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black font-bold `}
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium">Bio</label>
            <textarea
              id="bio"
              name="bio"
              rows={3}
              value={editedUser.bio}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 font-bold mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black font-bold`}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium">Location</label>
            <input
              id="location"
              name="location"
              type="text"
              value={editedUser.location}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 font-bold mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black font-bold`}
            />
          </div>
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium">Contact Number</label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={editedUser.contactNumber}
              onChange={handleChange}
              disabled={!isEditing}
              className={`p-3 font-bold mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:bg-gray-100 text-black font-bold`}
            />
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Cooking Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
                <p className="text-2xl font-bold">{currentUser?.recipesCreated}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Recipes Created</p>
            </div>
            <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
              <p className="text-2xl font-bold">{currentUser?.favoriteCuisine}</p>
              <p className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Favorite Cuisine</p>
            </div>
          </div>
        </div>
      </div>
      <div className={`px-8 py-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
            >
              <Check className="w-4 h-4 mr-2" />
              Save Changes
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={handleEdit}
            className="w-full flex justify-center items-center sm:px-9 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>
    </form>
  );
}
