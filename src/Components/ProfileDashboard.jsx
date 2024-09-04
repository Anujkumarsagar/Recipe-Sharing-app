import { useState } from 'react';
import { PlusIcon, BookOpenIcon, UserIcon, CogIcon } from 'lucide-react';
import PopCardForRecipe from './PopCardForRecipe';
import { Link } from 'react-router-dom';

const recipesData = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    category: "Pasta",
    image: "/placeholder.svg?height=200&width=300",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    author: "Chef John",
    likes: 120,
    ingredients: [
      "400g spaghetti",
      "200g pancetta",
      "4 large eggs",
      "100g Pecorino cheese",
      "100g Parmesan",
      "Freshly ground black pepper",
    ],
    instructions: [
      "Cook spaghetti in a large pot of boiling salted water.",
      "Fry pancetta with a little olive oil until crispy.",
      "Whisk eggs and cheese in a bowl.",
      "Drain pasta, reserving some cooking water.",
      "Mix pasta with pancetta, then add egg mixture off the heat.",
      "Add cooking water if needed to create a creamy sauce.",
      "Season with black pepper and serve immediately.",
    ],
  },
  // Add more recipes as needed
];

export default function ProfileDashboard() {
  const [userLoggedIn, setUserLoggedIn] = useState(true); // Example state, replace with your actual logic
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipes, setRecipes] = useState(recipesData);

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
        <aside className={`hidden md:block w-64 mr-8 ${userLoggedIn ? 'bg-gray-100' : ''}`}>
          <nav className="space-y-2">
            <Link
              to=""
              className={`flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200 ${userLoggedIn ? 'bg-gray-200' : ''}`}
              aria-label="My Recipes"
            >
              <BookOpenIcon className="h-6 w-6" />
              <span className={`font-bold ${userLoggedIn ? 'text-gray-900' : 'text-gray-700'}`}>My Recipes</span>
            </Link>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200"
              aria-label="Profile"
            >
              <UserIcon className="h-6 w-6" />
              <span>Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg font-medium hover:bg-gray-200"
              aria-label="Settings"
            >
              <CogIcon className="h-6 w-6" />
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          {userLoggedIn ? (
            <>
              <h2 className="text-3xl font-bold leading-tight tracking-tighter text-gray-900 mb-4">My Recipes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scrollbar-thin">
                {recipes.map(recipe => (
                  <div
                    key={recipe.id}
                    className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                    onClick={() => handleRecipeClick(recipe)}
                    aria-label={`View details for ${recipe.title}`}
                  >
                    <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                      <p className="text-gray-600">{recipe.description}</p>
                    </div>
                    <div className="p-4 flex items-center text-xs font-bold">
                      <img src="../3d-star.svg" className="w-4 h-4 mr-1" alt="Star" />
                      {recipe.likes}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center text-gray-600">Please log in to view your recipes.</div>
          )}
        </main>
      </div>

      {selectedRecipe && (
        <PopCardForRecipe selectedRecipe={selectedRecipe} handleCloseRecipe={handleCloseRecipe} />
      )}

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
