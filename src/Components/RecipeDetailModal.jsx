import React from 'react';

const RecipeDetailModal = ({ recipe, onClose }) => {
    if (!recipe) return null; // Don't render if no recipe is selected

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-4 max-w-md w-full">
                <h2 className="text-xl font-bold">{recipe.title}</h2>
                <p>{recipe.description}</p>
                {/* Add more details as needed */}
                <button 
                    onClick={onClose} 
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default RecipeDetailModal;
