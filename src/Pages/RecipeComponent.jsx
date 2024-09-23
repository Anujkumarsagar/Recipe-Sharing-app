import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopCardForRecipe from '../Components/PopCardForRecipe';
import { getAllRecipes, searchRecipes, getRecipesByCategory, getRecipeById } from '../store/recipeSlice.js';
import { getAllCategories } from '../store/categorySlice.js';

export default function RecipeComponent() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { recipes, error } = useSelector((state) => state.recipe);
  console.log("recipes",recipes)
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory !== 'All') {
      dispatch(getRecipesByCategory(selectedCategory));
    } else {
      dispatch(getAllRecipes());
    }
  }, [dispatch, selectedCategory]);

  const handleSearch = useCallback((event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setSearchTerm('');
    setCurrentPage(1);
  }, []);

  const handleRecipeClick = useCallback((recipeId) => {
    dispatch(getRecipeById(recipeId)).then((action) => {
      if (action.payload) {
        setSelectedRecipe(action.payload); //payload.data
        // console.log("Acion payload",action.payload)
      }
    });
  }, [dispatch]);

  const handleCloseRecipe = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const filteredRecipes = recipes.filter(recipe => 
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRecipes = filteredRecipes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  console.log(currentRecipes);

  const totalPages = Math.ceil(filteredRecipes.length / itemsPerPage);

  if (error) return <div>Error: {error.message || error}</div>;

  return (
    <div className="max-w-6xl sm:scrollbar-thin max-sm:m-3 mx-auto p-4">
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
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 border border-gray-300 rounded ${selectedCategory === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
            aria-pressed={selectedCategory === 'All'}
          >
            All
          </button>
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map(category => (
              <button
                key={category._id}
                onClick={() => handleCategoryChange(category._id)}
                className={`px-4 py-2 border border-gray-300 rounded ${selectedCategory === category._id ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                aria-pressed={selectedCategory === category._id}
              >
                {category.name}
              </button>
            ))
          ) : (
            <div>No categories available</div>
          )}
        </div>
      </div>
      {currentRecipes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {currentRecipes.map(recipe => (
            <div
              key={recipe._id}
              className="border border-gray-300 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => handleRecipeClick(recipe._id)}
            >
              <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  {recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                    <span className="text-blue-600">{recipe.title}</span>
                  ) : (
                    recipe.title
                  )}
                </h3>
                <p className="text-gray-600">{recipe.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No recipes found</div>
      )}
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
      {selectedRecipe && 
        <PopCardForRecipe selectedRecipe={selectedRecipe.data} handleCloseRecipe={handleCloseRecipe} />
      }
    </div>
  );
}
