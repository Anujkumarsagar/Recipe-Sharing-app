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
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  console.log("recipe in recipe component", selectedRecipe)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { recipes, error } = useSelector((state) => state.recipe);
  const { categories } = useSelector((state) => state.category);
  const { theme } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([dispatch(getAllRecipes()), dispatch(getAllCategories())]);
      setLoading(false);
    };
    fetchData();
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

  const handleRecipeClick = useCallback((recipe) => {
    setSelectedRecipe(recipe);
    console.log(recipe);
  }, []);

  const handleCloseRecipe = useCallback(() => {
    setSelectedRecipe(null);
  }, []);

  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const filteredRecipes = recipes?.data?.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentRecipes = filteredRecipes?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredRecipes?.length / itemsPerPage);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message || error}</div>;

  return (
    <div className={` relative mx-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} rounded-lg`}>
      <div className='sticky top-0 bg-gray-800 z-10 mb-6 w-full rounded-lg' >
        <Navbar />
      </div>
      <h1 className="text-3xl font-bold text-center mb-6">Recipes</h1>

      {/* Search Bar */}
      <div className="flex flex-col items-center mb-6 p-4 ">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full max-w-md p-2 border border-gray-300 rounded mb-4"
        />

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-2 ">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ">
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
        <div className="flex justify-center mt-6 ">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 mb-3 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* Recipe Popup */}

      {selectedRecipe && (
        <div className='recipe-popup-container fixed z-50 top-0 right-0'>
          <PopCardForRecipe selectedRecipe={selectedRecipe} handleCloseRecipe={handleCloseRecipe} />
        </div>
      )}

    </div>
  );
}
