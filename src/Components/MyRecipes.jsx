import React from 'react';
import PopCardForRecipe from './PopCardForRecipe';

export default function MyRecipes({ userLoggedIn, recipes, handleRecipeClick, selectedRecipe, handleCloseRecipe }) {
  return (
    <aside>
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

              {selectedRecipe && (
                <PopCardForRecipe selectedRecipe={selectedRecipe} handleCloseRecipe={handleCloseRecipe} />
              )}
            </div>
          </>
        ) : (
          <div className="text-center text-gray-600">Please log in to view your recipes.</div>
        )}
      </main>
    </aside>
  );
}
