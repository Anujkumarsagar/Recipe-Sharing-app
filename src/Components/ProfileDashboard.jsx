import { useState } from 'react';
import { PlusIcon, BookOpenIcon, UserIcon, CogIcon } from 'lucide-react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import MyRecipes from './MyRecipes';
import Profile from './Profile.jsx';
import Settings from './Settings.jsx';

const recipesData = [
  {
    id: 6,
    title: "Chocolate Chip Cookies",
    image: "https://example.com/chocolate-chip-cookies.jpg",
    description: "Soft and chewy cookies loaded with chocolate chips.",
    likes: 250,
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1/2 teaspoon baking soda",
      "1/2 teaspoon baking powder",
      "1/4 teaspoon salt",
      "1/2 cup unsalted butter, room temperature",
      "1/2 cup granulated sugar",
      "1/2 cup packed brown sugar",
      "1 large egg",
      "1 teaspoon vanilla extract",
      "1 cup semi-sweet chocolate chips"
    ],
    instructions: [
      "Preheat your oven to 350°F (175°C). Line a baking sheet with parchment paper.",
      "In a medium bowl, whisk together the flour, baking soda, baking powder, and salt. Set aside.",
      "In a large bowl, cream together the butter, granulated sugar, and brown sugar until light and fluffy.",
      "Beat in the egg and vanilla extract until well combined.",
      "Gradually add the dry ingredients to the butter mixture, mixing until just combined.",
      "Fold in the chocolate chips.",
      "Drop rounded tablespoons of dough onto the prepared baking sheet, spacing them about 2 inches apart.",
      "Bake for 10-12 minutes, or until the edges are golden brown but the centers are still soft.",
      "Allow the cookies to cool on the baking sheet for 5 minutes before transferring to a wire rack to cool completely."
    ]
  },
  // Other recipe objects...
];

export default function ProfileDashboard() {
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState(recipesData);
  const location = useLocation();

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        {/* Sidebar */}
        <aside className={`lg:flex max-sm:hidden w-64 mr-8 ${userLoggedIn ? 'bg-gray-100' : ''}`}>
          <nav className="space-y-2">
            <Link
              to="myrecipes"
              className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 ${location.pathname === '/profile/myrecipes' ? 'bg-gray-200' : ''}`}
              aria-label="My Recipes"
            >
              <BookOpenIcon className="h-6 w-6" />
              <span className={`font-bold`}>My Recipes</span>
            </Link>
            <Link
              to="profile"
              className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 ${location.pathname === '/profile/profile' ? 'bg-gray-200' : ''}`}
              aria-label="Profile"
            >
              <UserIcon className="h-6 w-6" />
              <span>Profile</span>
            </Link>
            <Link
              to="settings"
              className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 ${location.pathname === '/profile/settings' ? 'bg-gray-200' : ''}`}
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
                userLoggedIn={userLoggedIn}
                recipes={recipes}
                handleRecipeClick={handleRecipeClick}
                selectedRecipe={selectedRecipe}
                handleCloseRecipe={handleCloseRecipe}
              />
            } />
            <Route path="profile" element={<Profile userLoggedIn={userLoggedIn} />} />
            <Route path="settings" element={<Settings userLoggedIn={userLoggedIn} />} />
          </Routes>
        </main>
      </div>

      {/* Floating Action Button */}
      <button
        className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Add new recipe"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
