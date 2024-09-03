import React, { useState, useEffect } from 'react';

// Mock data for recipes
const recipesData = [
  {
    id: 1,
    name: "Spaghetti Carbonara",
    category: "Pasta",
    image: "/placeholder.svg?height=200&width=300",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    ingredients: ["400g spaghetti", "200g pancetta", "4 large eggs", "100g Pecorino cheese", "100g Parmesan", "Freshly ground black pepper"],
    instructions: [
      "Cook spaghetti in a large pot of boiling salted water.",
      "Fry pancetta with a little olive oil until crispy.",
      "Whisk eggs and cheese in a bowl.",
      "Drain pasta, reserving some cooking water.",
      "Mix pasta with pancetta, then add egg mixture off the heat.",
      "Add cooking water if needed to create a creamy sauce.",
      "Season with black pepper and serve immediately."
    ]
  },
  {
    id: 2,
    name: "Chicken Tikka Masala",
    category: "Curry",
    image: "/placeholder.svg?height=200&width=300",
    description: "Creamy and spicy Indian curry with tender chicken pieces",
    ingredients: ["800g chicken breast", "1 cup yogurt", "2 tbsp lemon juice", "2 tsp ground cumin", "2 tsp red chili powder", "2 tsp garam masala", "2 cups tomato puree", "1 cup heavy cream"],
    instructions: [
      "Marinate chicken in yogurt, lemon juice, and spices for 2 hours.",
      "Grill or bake the marinated chicken until cooked through.",
      "In a large pan, simmer tomato puree with remaining spices.",
      "Add grilled chicken and cream, simmer for 10 minutes.",
      "Garnish with fresh coriander and serve with naan bread."
    ]
  },
  {
    id: 3,
    name: "Vegetable Stir Fry",
    category: "Vegetarian",
    image: "/placeholder.svg?height=200&width=300",
    description: "Quick and healthy mix of fresh vegetables in a savory sauce",
    ingredients: ["2 cups mixed vegetables", "2 tbsp oil", "2 cloves garlic", "1 tbsp soy sauce", "1 tbsp oyster sauce", "1 tsp sesame oil"],
    instructions: [
      "Heat oil in a wok or large frying pan.",
      "Add minced garlic and stir-fry for 30 seconds.",
      "Add vegetables and stir-fry for 3-4 minutes.",
      "Add soy sauce and oyster sauce, cook for another 2 minutes.",
      "Drizzle with sesame oil before serving."
    ]
  },
  {
    id: 4,
    name: "Berry Smoothie Bowl",
    category: "Breakfast",
    image: "/placeholder.svg?height=200&width=300",
    description: "Refreshing blend of mixed berries topped with granola and fruits",
    ingredients: ["2 cups mixed frozen berries", "1 banana", "1/2 cup Greek yogurt", "1/4 cup almond milk", "1 tbsp honey", "Toppings: granola, fresh berries, chia seeds"],
    instructions: [
      "Blend frozen berries, banana, yogurt, almond milk, and honey until smooth.",
      "Pour into a bowl.",
      "Top with granola, fresh berries, and chia seeds.",
      "Serve immediately."
    ]
  }
];

export default function RecipeComponent() {
  const [recipes, setRecipes] = useState(recipesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = ['All', ...new Set(recipesData.map(recipe => recipe.category))];

  useEffect(() => {
    const filteredRecipes = recipesData.filter(recipe => 
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'All' || recipe.category === selectedCategory)
    );
    setRecipes(filteredRecipes);
  }, [searchTerm, selectedCategory]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  return (
    <div className="max-w-6xl  mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
          aria-label="Search recipes"
        />
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 border border-gray-300 rounded ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
              aria-pressed={selectedCategory === category}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 scrollbar-thin gap-6">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            className="border border-gray-300  rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleRecipeClick(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="fixed inset-0  bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white scrollbar-thin p-6  rounded-lg max-w-lg w-full relative overflow-y-auto max-h-[80vh]">
            <button className="absolute top-2 right-2 text-2xl font-semibold text-gray-600" onClick={handleCloseRecipe} aria-label="Close recipe details">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>
            <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-48 object-cover mb-4" />
            <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside">
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
