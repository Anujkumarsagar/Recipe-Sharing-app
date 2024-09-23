import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SignupPage from './EnhancedLoginToggle';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/userSlice';
import { getProfile } from '../store/userSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { profile, theme } = useSelector((state) => state.user);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile/profile");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(getProfile());
    }
  }, [isAuthenticated, profile, dispatch]);

  useEffect(() => {
    if (isLoginOpen || isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isLoginOpen, isNavOpen]);

  return (
    <header className={`transition w-[80%] m-auto flex items-center justify-between h-16 px-4 md:px-6 ${theme === 'dark' ? 'bg-background text-white' : 'bg-background text-black'} border-b`}>
      <nav className="flex items-center gap-6">
        <Link className="flex items-center gap-2 text-lg font-semibold" to="/" rel="ugc">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
          </svg>
          <span className="sr-only">Recipe App</span>
        </Link>
        <div className="hidden md:flex font-bold gap-4">
          <Link to="/" className="text-foreground dotUnderline">Home</Link>
          <Link to="/recipes" className="font-bold text-foreground dotUnderline">Recipes</Link>
          {isAuthenticated && (
            <Link to="/profile/myrecipes" className="text-foreground dotUnderline">My Recipes</Link>
          )}
        </div>
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsNavOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </nav>
      
      <div className="flex items-center gap-4">
        <form className="relative hidden md:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="flex h-10 w-full border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9 pr-4 py-2 rounded-lg bg-muted text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search recipes..."
            type="search"
          />
        </form>

        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <button
              onClick={handleProfileClick}
              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border-2 p-5 disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              type="button"
              aria-haspopup="menu"
              aria-expanded="false"
              data-state="closed"
            >
              <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
                <img className="aspect-square h-full w-full" alt="User" src={profile?.profilePic || "https://gravatar.com/avatar/1d1106d0b15053200c50c641d2d5bbd7?s=400&d=robohash&r=x"} />
              </span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium dotUnderline px-4 py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" x2="3" y1="12" y2="12"></line>
            </svg>
            Login
          </button>
        )}
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white scale-75 rounded-lg p-1" style={{ maxWidth: '400px', width: '90%', margin: 'auto' }}>
            <SignupPage onClose={() => setIsLoginOpen(false)} />
          </div>
        </div>
      )}

      {isNavOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white dark:bg-gray-800 p-8 rounded-lg`} style={{ maxWidth: '400px', width: '90%', margin: 'auto' }}>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-foreground dark:text-gray-100 dotUnderline" onClick={() => setIsNavOpen(false)}>Home</Link>
              <Link to="/recipes" className="font-bold text-foreground dark:text-gray-100 dotUnderline" onClick={() => setIsNavOpen(false)}>Recipes</Link>
              {isAuthenticated && (
                <>
                  <Link to="/profile/myrecipes" className="text-foreground dark:text-gray-100 dotUnderline" onClick={() => setIsNavOpen(false)}>My Recipes</Link>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 rounded-lg bg-red-500 text-white font-medium px-4 py-2 hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </>
              )}
              <button
                onClick={() => setIsNavOpen(false)}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-500 text-white font-medium px-4 py-2 hover:bg-red-600 transition-colors"
              >
                Close
              </button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
