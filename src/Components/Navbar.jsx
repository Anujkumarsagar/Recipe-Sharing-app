import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EnhancedLoginToggle from './EnhancedLoginToggle';

const Navbar = () => {
  const navigate = useNavigate(); // Use the correct hook for navigation
  const [isLoginOpen, setIsLoginOpen] = useState(true);
  const [loginToggle, setLoginToggle] = useState(false);
  const [User, setUser] = useState(true);

  const handleProfileClick = () => {
    navigate("/profile/profile"); // Navigate using the hook
  };

  return (
    <header className="transition w-11/12 m-auto flex items-center justify-between h-16 px-4 md:px-6 bg-background border-b">
      {/* Navigation Section */}
      <nav className=" flex items-center gap-6">
        {/* Logo and Home Link */}
        <Link className="flex items-center gap-2 text-lg font-semibold" to="/" rel="ugc">
          {/* Icon SVG */}
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
        {/* Links for Categories */}
        {isLoginOpen && (
          <div className="font-bold gap-4 inline-flex min-md:hidden">
            <Link to="/" className="text-foreground dotUnderline">Home</Link>
            <Link to="/recipes" className="font-bold text-foreground dotUnderline">Recipes</Link>
          </div>
        )}

        {isLoginOpen && (
          <div className="font-bold gap-4 inline-flex min-md:hidden">
            <Link to="/profile/myrecipes" className="text-foreground dotUnderline">My Recipes</Link>
          </div>
        )}
      </nav>
      <div>
        <div class="animated-text">
          <span className='delay-700'>G</span>
          <span>r</span>
          <span>a</span>
          <span>d</span>
          <span>i</span>
          <span>e</span>
          <span>n</span>
          <span>t</span>
          <span> </span>
          <span>T</span>
          <span>e</span>
          <span>x</span>
          <span>t</span>
        </div>

      </div>
      {/* Right Side Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
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

        {/* User Profile Button */}
        {User && (
          <button
            onClick={handleProfileClick} // Use function to navigate
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium rounded-full ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none border-2 p-5 disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
            type="button"
            aria-haspopup="menu"
            aria-expanded="false"
            data-state="closed"
          >
            <span className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8">
              <img className="aspect-square h-full w-full" alt="User" src="https://gravatar.com/avatar/1d1106d0b15053200c50c641d2d5bbd7?s=400&d=robohash&r=x" />
            </span>
          </button>
        )}
        {/* Login Button */}
        {!User && (
          <Link
            className="hidden md:inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground font-medium dotUnderline"
            to="/login"
            rel="ugc"
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
          </Link>
        )}
      </div>

      {/* Conditional Login Toggle */}
      {loginToggle && (
        <div className="z-10 absolute w-[75%] h-[80%] bg-black">
          {/* Add your login modal content here */}
          <EnhancedLoginToggle />
        </div>
      )}
    </header>
  );
};

export default Navbar;
