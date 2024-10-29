import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Footer() {
  const theme = useSelector((state) => state.user.theme);
  const textColorClass = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const bgColorClass = theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-300 focus:ring-purple-400' : 'bg-white border-gray-300 text-gray-700 focus:ring-purple-500';

  return (
    <footer className="py-8 transition-colors duration-300 z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Recipes'].map((link) => (
                <li key={link}>
                  <a href={`#${link}`} className={`hover:${textColorClass}`}>{link}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Appetizers', 'Main Dishes', 'Desserts', 'Vegetarian'].map((category) => (
                <li key={category}>
                  <a href="#" className={`hover:${textColorClass}`}>{category}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className={`hover:${textColorClass}`}>Our Story</a></li>
              <li><a href="#meetourchef" className={`hover:${textColorClass}`}>Meet Our Chefs</a></li>
              <li><Link to="/contactus" className={`hover:${textColorClass}`}>Contact Us</Link></li>
              <li><a href="#" className={`hover:${textColorClass}`}>Privacy Policy</a></li>
            </ul>
          </div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              {[FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon].map((Icon, index) => (
                <a href="#" key={index} className={`text-gray-600 hover:${textColorClass}`}>
                  <Icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-2">Subscribe to our newsletter</h4>
              <form className="flex flex-col md:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent md:rounded-l-md md:border-r-0 transition-colors duration-300 ${bgColorClass}`}
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
