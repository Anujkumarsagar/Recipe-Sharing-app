import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../store/categorySlice';
import { getAllRecipes } from '../store/recipeSlice'; // Assuming you have a recipeSlice
import RecipeList from './RecipeList'; // Assuming you have a RecipeList component

const RecipeComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const recipes = useSelector((state) => state.recipe.recipes); // Assuming you have a recipe state
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredRecipes(recipes.filter(recipe => recipe.categoryId === selectedCategory));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes]);

  return (
    <div>
      <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
        <option value=''>All Categories</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </select>
      <RecipeList recipes={filteredRecipes} />
    </div>
  );
};

export default RecipeComponent;