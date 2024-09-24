'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../store/categorySlice'; // Import the action to fetch categories
import { createRecipe } from '../store/recipeSlice'; // Import the createRecipe action from recipeSlice

export default function CreateRecipe({ onClose }) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category); // Access categories from the store
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
  });
  const [image, setImage] = useState(null);
  console.log("categories", categories);

  useEffect(() => {
    dispatch(getAllCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(cat => cat._id === selectedCategoryId);
    setRecipe((prev) => ({ ...prev, category: selectedCategory }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('ingredients', recipe.ingredients);
    formData.append('instructions', recipe.instructions);
    formData.append('category', recipe.category._id); // Use category id
    console.log("category id", recipe.category._id);
    if (image) {
      formData.append('image', image);
    }
    try {
      const resultAction = await dispatch(createRecipe(formData)); // Dispatch the createRecipe action with formData
      if (createRecipe.fulfilled.match(resultAction)) {
        alert('Recipe submitted successfully!');
        onClose();
        setRecipe({
          title: '',
          description: '',
          ingredients: '',
          instructions: '',
          category: '',
        });
        setImage(null);
      } else {
        alert('Failed to submit recipe: ' + resultAction.payload.message);
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
      alert('An error occurred while submitting the recipe.');
    }
  };

  return (
    <div className="h-[90vh] w-11/12 overflow-y-auto">
      <div className="container mx-auto p-6 bg-white dark:bg-gray-800 transition-colors duration-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Create a New Recipe</h1>
          <X className="w-6 h-6" onClick={onClose} />
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title
            </label>
            <p className='text-xs text-gray-500'>Keep it short and descriptive</p>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={recipe.title}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              required
              value={recipe.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            ></textarea>
          </div>
          <div>
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Ingredients
            </label>
            <p className='text-xs text-gray-500'>For new line separate by comma</p>
            <textarea
              id="ingredients"
              name="ingredients"
              rows={3}
              required
              value={recipe.ingredients}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="For new line separate by comma"
            ></textarea>
          </div>
          <div>
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Instructions
            </label>
            <p className='text-xs text-gray-500'>For new line separate by comma</p>
            <textarea
              id="instructions"
              name="instructions"
              rows={3}
              required
              value={recipe.instructions}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="For new line separate by comma"
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={recipe.category._id || ''} // Ensure value is controlled
              onChange={handleCategoryChange} // Use the new handler
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option> // Populate categories from the fetched data
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-700 dark:file:text-gray-300"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Create Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
