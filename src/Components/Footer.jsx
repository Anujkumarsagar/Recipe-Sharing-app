import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function Footer() {
  const theme = useSelector((state) => state.user.theme);

  return (
    <footer className={`py-8 transition-colors duration-300 z-10`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Home</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Recipes</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>My Recipes</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Submit a Recipe</a></li>
            </ul>
          </div>
          {/* Categories Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Appetizers</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Main Dishes</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Desserts</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Vegetarian</a></li>
            </ul>
          </div>
          {/* About Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Our Story</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Meet Our Chefs</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Contact Us</a></li>
              <li><a href="#" className={`hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>Privacy Policy</a></li>
            </ul>
          </div>
          {/* Connect With Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className={`text-gray-600 hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#" className={`text-gray-600 hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <TwitterIcon className="w-6 h-6" />
              </a>
              <a href="#" className={`text-gray-600 hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className={`text-gray-600 hover:${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>
                <YoutubeIcon className="w-6 h-6" />
              </a>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex flex-col md:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:rounded-l-md md:border-r-0 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-300 focus:ring-purple-400' : 'bg-white border-gray-300 text-gray-700 focus:ring-purple-500'}`}
                />
                <button
                  type="submit"
                  className={`bg-primary text-white px-4 py-2 rounded-md mt-2 md:mt-0 md:rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-300 ${theme === 'dark' ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'}`}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className={`mt-8 pt-8 border-t text-center transition-colors duration-300 ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
          <p>&copy; 2024 Delicious Recipes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
