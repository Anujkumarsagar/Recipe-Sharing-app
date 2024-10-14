import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../store/categorySlice';
import { getAllRecipes } from '../store/recipeSlice';
import RecipeList from './RecipeList';

const RecipeComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  const recipes = useSelector(state => state.recipe.recipes);
  
  useEffect(() => {
    console.log("Recipes loaded:", recipes.length);
    console.log("Categories loaded:", categories.length);
  }, [recipes, categories]);

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const  response =  dispatch(getAllCategories());
        console.log(response)
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchRecipes = async () => {
      try {
        await dispatch(getAllRecipes());
        console.log("Recipes fetched successfully.");
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchCategories();
    fetchRecipes();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredRecipes(recipes && recipes.filter(recipe => recipe.categoryId === selectedCategory));
      console.log(`Filtered recipes for category ${selectedCategory}:`, filteredRecipes.length);
    } else {
      setFilteredRecipes(recipes);
      console.log("Showing all recipes.");
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
