import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Oops! Page not found</p>
        <div className="mb-8">
          <img src="/404-chef.svg" alt="Chef looking confused" className="w-64 h-64 mx-auto" />
        </div>
        <p className="text-xl text-gray-700 mb-8">
          Looks like this recipe got lost in the kitchen!
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;