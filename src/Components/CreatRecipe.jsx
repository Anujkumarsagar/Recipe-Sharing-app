import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createRecipe } from '../store/recipeSlice';

const CreateRecipe = ({ onClose }) => {
  const dispatch = useDispatch();
  const [recipeData, setRecipeData] = useState({
    title: '',
    description: '',
    ingredients: '',
    instructions: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createRecipe(recipeData)).unwrap();
      // Reset form and close modal on successful submission
      setRecipeData({
        title: '',
        description: '',
        ingredients: '',
        instructions: '',
        category: '',
      });
      onClose();
    } catch (error) {
      console.error('Failed to create recipe:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Create New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipeData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block mb-1">Ingredients</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="instructions" className="block mb-1">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={recipeData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Create Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
