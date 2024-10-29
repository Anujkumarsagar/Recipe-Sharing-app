import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleLikeButton = async (recipeId) => {
    if (!user) return; // If user is not logged in, do not proceed

    try {
      // Send the like request to the server
      await axios.put(`/api/recipes/${recipeId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });

      // Update the user's likes count
      setUser(prevUser => ({
        ...prevUser,
        likes: (prevUser.likes || 0) + 1 // Ensure previous likes count exists
      }));
    } catch (error) {
      console.error('Failed to like the recipe:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, handleLikeButton }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
