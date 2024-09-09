import React from 'react';

function PopCardForRecipe({ selectedRecipe, handleCloseRecipe }) {
  if (!selectedRecipe) return null; // Don't render anything if no recipe is selected

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 bg-opacity-75 flex justify-center items-center transition-opacity duration-300">
      <div className="scrollbar-thin bg-white p-6 rounded-lg max-w-lg w-full relative overflow-y-auto max-sm:m-3 max-h-[80vh] transition-transform transition-opacity duration-300">
        <button
          className="absolute top-2 right-2 text-2xl font-semibold text-gray-600"
          onClick={handleCloseRecipe}
          aria-label="Close recipe details"
        >
          &times;
        </button>
        <h2 className="cards text-2xl font-bold mb-4">{selectedRecipe.title}</h2>
        <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-48 object-cover mb-4" />
        <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>

        {/* Conditional rendering for ingredients */}
        {selectedRecipe.ingredients && (
          <>
            <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
            <ul className="list-disc list-inside mb-4">
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </>
        )}

        {/* Conditional rendering for instructions */}
        {selectedRecipe.instructions && (
          <>
            <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
            <ol className="list-decimal list-inside">
              {selectedRecipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

export default PopCardForRecipe;
