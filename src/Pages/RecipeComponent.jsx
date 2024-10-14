import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopCardForRecipe from '../Components/PopCardForRecipe';
import { getAllRecipes, getRecipesByCategory } from '../store/recipeSlice.js';
import { getAllCategories } from '../store/categorySlice.js';
import Navbar from '../Components/Navbar.jsx';

export default function RecipeComponent() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Set to null when no recipe is selected
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { recipes, error } = useSelector((state) => state.recipe);
  const { categories } = useSelector((state) => state.category);
  const { theme } = useSelector((state) => state.user); // Added to handle theme

  // Fetch all recipes and categories on component load
  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllCategories());
  }, [dispatch]);

  // Fetch recipes by category when category is changed
  useEffect(() => {
    if (selectedCategory !== 'All') {
      dispatch(getRecipesByCategory(selectedCategory));
    } else {
      dispatch(getAllRecipes());
    }
  }, [dispatch, selectedCategory]);

  // Handle search input
  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  // Handle category change
  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  // Handle recipe click to open the recipe details in a popup
  const handleRecipeClick = useCallback((recipe) => {
    setSelectedRecipe(recipe);
    console.log(selectedRecipe)
  }, []);

  // Close the recipe popup
  const handleCloseRecipe = useCallback(() => {
    setSelectedRecipe(null); // Set to null instead of []
  }, []);

  // Pagination handler
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  // Filter recipes by search term
  const filteredRecipes = recipes?.data?.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the current recipes for pagination
  const currentRecipes = filteredRecipes?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredRecipes?.length / itemsPerPage);

  if (error) return <div>Error: {error.message || error}</div>;

  return (
    <div className={`relative mx-auto p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} rounded-lg`}> {/* Adjusted to handle theme */}
      <Navbar />
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>

      {/* Search Bar */}
      <div className="flex flex-col items-center mb-6">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 border border-gray-300 rounded ${selectedCategory === 'All' ? 'bg-slate-400 text-black ' : 'bg-gray-100 text-black'}`}
          >
            All
          </button>
          {categories?.map(category => (
            <button
              key={category._id}
              onClick={() => handleCategoryChange(category._id)}
              className={`px-4 py-2 border border-gray-300 rounded ${selectedCategory === category._id ? 'bg-blue-500 text-black' : 'bg-gray-100 text-black'}`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Recipe Grid */}
      {currentRecipes?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentRecipes.map(recipe => (
            <div
              key={recipe._id}
              className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleRecipeClick(recipe)}
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {recipe.title}
                </h3>
                <p className="text-gray-600">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No recipes found</div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Recipe Popup */}

      {selectedRecipe &&
        <div className='recipe-popup-container fixed z-50 top-0 right-0'>
          <PopCardForRecipe selectedRecipe={selectedRecipe} handleCloseRecipe={handleCloseRecipe} />
        </div>
      }

    </div>
  );
}
