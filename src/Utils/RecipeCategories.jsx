import React from 'react';

const RecipeCategories = () => {
  return (
    <div className="bg-background rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold mb-4">Recipe Categories</h2>
      <div className="grid gap-2">
        {['All', 'Salads', 'Main Dishes', 'Vegetarian', 'Seafood'].map((category) => (
          <button
            key={category}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories;
