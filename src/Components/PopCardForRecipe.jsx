import React, { useState, useEffect } from 'react';

function PopCardForRecipe({ selectedRecipe, handleCloseRecipe }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedRecipe) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [selectedRecipe]);

  const handleTransitionEnd = () => {
    if (!selectedRecipe) {
      setShow(false);
    }
  };

  return (
    <div
      className={`  fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div
        className={` scrollbar-thin bg-white p-6 rounded-lg max-w-lg w-full relative overflow-y-auto max-h-[80vh] transition-transform transition-opacity duration-300 ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
      >
        <button
          className="absolute top-2 right-2 text-2xl font-semibold text-gray-600"
          onClick={handleCloseRecipe}
          aria-label="Close recipe details"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>
        <img src={selectedRecipe.image} alt={selectedRecipe.name} className="w-full h-48 object-cover mb-4" />
        <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
        <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside">
          {selectedRecipe.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default PopCardForRecipe;
