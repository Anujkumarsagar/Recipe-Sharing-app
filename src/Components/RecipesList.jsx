// Components/RecipesList.jsx
import React from 'react';
import { PlusIcon } from 'lucide-react';
import PopCardForRecipe from './PopCardForRecipe';

export default function RecipesList({ recipes, onRecipeClick, selectedRecipe, onCloseRecipe }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex">
        {/* Main content */}
        <main className="flex-1">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter text-gray-900 mb-4">My Recipes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scrollbar-thin">
            {recipes.map(recipe => (
              <div
                key={recipe.id}
                className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => onRecipeClick(recipe)}
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
        </main>
      </div>

      {selectedRecipe && (
        <PopCardForRecipe selectedRecipe={selectedRecipe} handleCloseRecipe={onCloseRecipe} />
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
