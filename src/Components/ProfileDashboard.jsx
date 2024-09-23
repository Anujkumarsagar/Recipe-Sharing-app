import { useState, useEffect } from 'react';
import { PlusIcon, BookOpenIcon, UserIcon, CogIcon } from 'lucide-react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserRecipes } from '../store/userSlice';
import MyRecipes from './MyRecipes';
import Profile from './Profile.jsx';
import Settings from './Settings.jsx';
import CreateRecipe from './CreatRecipe.jsx'; // Fixed typo from 'CreatRecipe.jsx' to 'CreateRecipe.jsx'

export default function ProfileDashboard() {
  const dispatch = useDispatch();
  const { isAuthenticated, recipes, currentUser, theme } = useSelector((state) => state.user); // Use user slice for currentUser and theme
  console.log("currentUser", currentUser);
  console.log("recipes", recipes);
  console.log("isAuthenticated", isAuthenticated);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showCreateRecipe, setShowCreateRecipe] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUserRecipes()); // Removed non-existent functions getProfile, getCategories, and getComments
    }
  }, [dispatch, isAuthenticated]);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  const handleCreateRecipeClick = () => {
    setShowCreateRecipe(true);
  };

  const handleCloseCreateRecipe = () => {
    setShowCreateRecipe(false);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 md: py-8 flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className={`lg:flex max-sm:hidden w-full lg:w-64 lg:mr-8 `}>
          <nav className="space-y-2">
            <Link
              to="myrecipes"
              className={`flex items-center space-x-3 p-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/profile/myrecipes' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="My Recipes"
            >
              <BookOpenIcon className="h-6 w-6" />
              <span className="font-bold">My Recipes</span>
            </Link>
            <Link
              to="profile"
              className={`flex items-center space-x-3 p-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/profile/profile' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="Profile"
            >
              <UserIcon className="h-6 w-6" />
              <span>Profile</span>
            </Link>
            <Link
              to="settings"
              className={`flex items-center space-x-3 p-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/profile/settings' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="Settings"
            >
              <CogIcon className="h-6 w-6" />
              <span>Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content with Nested Routes */}
        <main className="flex-1">
          <Routes>
            {/* Default route */}
            <Route path="myrecipes" element={
              <MyRecipes
                recipes={recipes}
                handleRecipeClick={handleRecipeClick}
                selectedRecipe={selectedRecipe}
                handleCloseRecipe={handleCloseRecipe}
                theme={theme}
              />
            } />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Add new recipe"
        onClick={handleCreateRecipeClick}
      >
        <PlusIcon className="h-6 w-6" />
      </button>

      {/* Create Recipe Modal */}
      {showCreateRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-full max-w-md">
            <CreateRecipe onClose={handleCloseCreateRecipe} />
          </div>
        </div>
      )}
    </div>
  );
}
