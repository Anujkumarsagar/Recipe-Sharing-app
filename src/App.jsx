import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken } from './store/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroPage from './Pages/HeroPage';
import RecipeComponent from './Pages/RecipeComponent';
import Navbar from './Components/Navbar';
import EnhancedLoginToggle from './Components/EnhancedLoginToggle';
import ProfileDashboard from './Components/ProfileDashboard';
import NotFoundPage from './Pages/NotFoundPage';
import MyRecipes from './Components/MyRecipes';
import { toggleTheme } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }

    // Check for user's preferred color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.add('light');
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.toggle('light', theme === 'light');
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <Router>
      <div className={` ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} transition-colors duration-300`}>
        <div className={`sticky top-0 z-20 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} bg-opacity-70 backdrop-blur-md shadow-md transition-colors duration-300`}>
          <Navbar theme={theme} />
          <button
            onClick={handleThemeToggle}
            className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        <main className="container mx-auto ">
          <Routes>
            <Route path="/profile/*" element={
              <div className={`shadow-lg rounded-lg p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <ProfileDashboard theme={theme} />
              </div>
            } />

            <Route path="/" element={
              <div className={`shadow-lg rounded-lg overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <HeroPage theme={theme} />
              </div>
            } />

            <Route path="/recipes" element={
              <div className={`shadow-lg rounded-lg p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <RecipeComponent theme={theme} />
              </div>
            } />

            <Route path="/login" element={
              <div className={`shadow-lg rounded-lg p-6 max-w-md mx-auto mt-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <EnhancedLoginToggle theme={theme} />
              </div>
            } />

            <Route path="/my-recipes" element={
              <div className={`shadow-lg rounded-lg p-6 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <MyRecipes theme={theme} />
              </div>
            } />

            <Route path="*" element={
              <div className={`shadow-lg rounded-lg p-6 text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <NotFoundPage theme={theme} />
              </div>
            } />
          </Routes>
        </main>

        <footer className={`py-4 text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-600'}`}>
          <p>&copy; 2023 Your Amazing Recipe App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
