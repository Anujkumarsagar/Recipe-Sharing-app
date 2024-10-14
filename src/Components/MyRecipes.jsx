import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PopCardForRecipe from './PopCardForRecipe';
import { getUserRecipes, getProfile } from "../store/userSlice";

export default function MyRecipes() {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, loading, recipes, recipesLoading, error, theme } = useSelector((state) => state.user);

  const [selectedRecipe, setSelectedRecipe] = useState(null);
  console.log("selectedRecipe", selectedRecipe)
  const [userRecipes, setUserRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoading(true);

      console.log("isAuthenticated", isAuthenticated);
      dispatch(getUserRecipes()).then((response) => {
        console.log("response in my recipes", response.payload.user.recipes)
        if (response.error) {
          console.error("Error fetching profile:", response.error);
        } else {
          setUserRecipes(response.payload.user.recipes); // Use recipes from profile
        }
        setIsLoading(false);
      });
    }
  }, [isAuthenticated, dispatch]);

  const handleRecipeClick = (recipe) => {
    console.log("recipe in my recipes", recipe)
    setSelectedRecipe(recipe);
  };

  const handleCloseRecipe = () => {
    setSelectedRecipe(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div className="text-center text-gray-600">Please log in to view your recipes.</div>;
  }

  if (!currentUser || !userRecipes || userRecipes.length === 0) {
    return <div className="text-center text-gray-600">You haven't created any recipes yet.</div>;
  }

  return (
    <main className={` p-5  relative flex-1 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white text-gray-900'}`}>
      <h2 className="text-3xl font-bold leading-tight tracking-tighter mb-4">My Recipes</h2>
      <div className="  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 scrollbar-thin">
        {userRecipes.map(recipe => (
          <div
            key={recipe._id}
            className="  cards cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => handleRecipeClick(recipe)}
            aria-label={`View details for ${recipe.title}`}
          >
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <p className="text-gray-600">{recipe.description}</p>
            </div>
            <div className="p-4 flex items-center text-xs font-bold">
              <img src="../3d-star.svg" className="w-4 h-4 mr-1" alt="Star" />
              {recipe.likes}
            </div>
          </div>
        ))}
      </div>
      <div className="recipe-popup-container fixed z-50 top-0 right-0 ">
        {selectedRecipe && (
          <PopCardForRecipe
          selectedRecipe={selectedRecipe}
          handleCloseRecipe={handleCloseRecipe}
          className="recipe-popup"
        />
        )}
      </div>
    </main >
  );
}


