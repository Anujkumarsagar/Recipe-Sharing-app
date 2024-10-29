import React, { useState, useEffect } from 'react';
import Card from './Card';
import AutoScrollingFrom from './AutoScrollingFrom';
import { inspiredfrom } from '../assets/Assets';
import { useDispatch, useSelector } from 'react-redux';
import RecipeDetailModal from './RecipeDetailModal'; // Import the modal component
import { getAllRecipes } from '../store/recipeSlice';

function GreenCard() {
    const rotations = [
        "rotate-45",
        "rotate-12",
        "-rotate-45",
        "-rotate-12",
        "rotate-6"
    ];

    const dispatch = useDispatch();
    // const { recipes, recipesLoading, error } = useSelector((state) => state.user);
    const [recipes, setRecipes] = useState(); 
    // how i use this

    //recupieloadg state use state
    // const [recipesLoading, setRecipesLoading] = useState(true);

    //dispaytch allrecipe
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await dispatch(getAllRecipes()).unwrap();

                if (response.success) {
                    setRecipes(response.data);
                    console.log("Recipes", response.data)
                }
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            }
        };
        fetchRecipes();
    }, [dispatch]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleCardClick = (recipe) => {
        setSelectedRecipe(recipe); // Set selected recipe to display in pop-up
    };

    const handleCloseRecipe = () => {
        setSelectedRecipe(null); // Clear the selected recipe
    };

    return (
        <div className='flex gap-2 flex-col rounded-lg'>
            <div className='lg:flex gap-3 rounded-lg w-full'>
                <div className="mb-2 h-[150px] lg:h-[400px] lg:w-[600px] bg-[#FE5047] Maven-light flex justify-center items-center text-[3rem] text-stroke-2 lg:text-stroke-4 lg:text-[6rem] text-stroke rounded-full">
                    Recipes
                </div>

                <div className='h-[400px] w-full lg:h-[400px] lg:w-[900px] bg-[#A7D2B5] Maven-light rounded-full relative flex justify-center items-center'>
                    {   (
                        <div className="cardContainer scale-[80%] flex items-center justify-center">
                            {Array.isArray(recipes) && recipes.slice(0, 5).map((recipe, index) => (
                                <Card
                                    key={recipe._id}
                                    recipe={recipe}
                                    rotate={`${rotations[index]} hover:shadow-2xl focus-visible:rotate-0 focus-visible:scale-110 focus-visible:z-30 focus-visible:shadow-2xl duration-300 ease-out scale-75 cursor-pointer`}
                                    tabIndex={0}
                                    onClick={() => handleCardClick(recipe)}
                                />
                            ))}

                        </div>
                    )}
                </div>
            </div>

            <div className='mt-20 flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-semibold Maven-light text-black'>Inspired From</h1>
                <AutoScrollingFrom inspiredfrom={inspiredfrom} />
                <AutoScrollingFrom inspiredfrom={inspiredfrom} reverse={true} />
            </div>

            <section className={`py-8 sm:py-12 z-10 transition-colors duration-300`}></section>

            {/* Modal for displaying selected recipe */}
            <RecipeDetailModal
                recipe={selectedRecipe}
                onClose={handleCloseRecipe}
            />
        </div>
    );
}

export default GreenCard;
