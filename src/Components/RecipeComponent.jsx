import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from '../store/categorySlice';
import { getAllRecipes } from '../store/recipeSlice';
import RecipeList from './RecipeList';

const RecipeComponent = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.category.categories);
  const recipes = useSelector(state => state.recipe.recipes);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getAllCategories());
        await dispatch(getAllRecipes());
        console.log("Data fetched successfully.");
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredRecipes(recipes.filter(recipe => recipe.categoryId === selectedCategory));
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selectedCategory, recipes]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

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
