import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './store/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import RecipeComponent from './Pages/RecipeComponent';
import EnhancedLoginToggle from './Components/EnhancedLoginToggle';
import ProfileDashboard from './Components/ProfileDashboard';
import NotFoundPage from './Pages/NotFoundPage';
import MyRecipes from './Components/MyRecipes'; // Corrected typo from 'Componentas' to 'Components'
import { toggleTheme } from './store/userSlice';
import ProtectedRoute from "./Components/ProtectedRoute";
import PopularChefs from './Components/PopularChefs';
import RecipeAdminDashboard from './Pages/RecipeAdminDashboard';
import ContactUs from './Components/ContactUs';

function App() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);

  // Fetch token and set initial theme
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    dispatch(toggleTheme(prefersDark ? 'dark' : 'light'));
  }, [dispatch]);

  // Toggle theme on change
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme(theme === 'dark' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-white ' : 'bg-gray-100 '}`}>

        <button
          onClick={handleThemeToggle}
          className={`fixed bottom-4 right-4 p-2 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'}`}
          aria-label={`Toggle to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          tabIndex={0} // Allow keyboard navigation
        >
          {theme === 'dark' ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <main className="container mx-auto px-4 py-8">
        
          <Routes>
            <Route path="/" element={<HeroPage />} />
            <Route path='/admin' element={<RecipeAdminDashboard/>} />

              <Route path="/profile/*" element={
                <ProfileDashboard />

              } />
          
            <Route path="/recipes" element={<RecipeComponent />} />

           
            <Route path="/login" element={<EnhancedLoginToggle />} />
            <Route path="/my-recipes" element={
              <MyRecipes />

            } />
            <Route path="*" element={<NotFoundPage />} />

            <Route path='/contactus' element={<ContactUs/>} />
          </Routes>

        </main>
      </div>
    </Router>
  );
}

export default App;
