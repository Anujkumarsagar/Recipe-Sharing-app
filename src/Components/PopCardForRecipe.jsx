
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRecipe } from '../store/recipeSlice';



const PopCardForRecipe = ({ selectedRecipe, handleCloseRecipe }) => {

  const dispatch = useDispatch();

  console.log("selectedRecipe", selectedRecipe)
  const [activeTab, setActiveTab] = useState('overview');
  const [isVisible, setIsVisible] = useState(false);
  const theme = useSelector((state) => state.user.theme);
  const currentUser = useSelector((state) => state.user.currentUser);


  //handleDelete Button

  const handleDelete =  async() => {
    try {
      const response =  dispatch(deleteRecipe(selectedRecipe._id))
      console.log("response of delete", response)
      handleClose()

    } catch (error) {
      console.error("something went wrong withh deleting recipe", error.message);

    }
  }
  
  useEffect(() => {
    

    if (selectedRecipe) {
      console.log("selectedRecipe", selectedRecipe);
      console.log("currentuser", currentUser);

      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Stop scrolling when pop is on
    } else {
      document.body.style.overflow = 'unset'; // Allow scrolling when pop is off
    }

    return () => {
      document.body.style.overflow = 'unset'; // Cleanup on component unmount
    };
  }, [selectedRecipe, handleDelete]);

  if (!selectedRecipe) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(handleCloseRecipe, 300);
  };


  const recipeFounded = currentUser.recipes.find(recipe => recipe._id === selectedRecipe._id)
  console.log("RecipeFounded", recipeFounded)

  const isOwnRecipe = currentUser && currentUser.id === selectedRecipe.authorId;

  return (
    <div
      className={`  relative  h-[100vh] w-[100vw]  bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } `}
    >
      <div
        className={`  bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
          } scale-75`}

      >
        <div className="relative">
          <img
            src={selectedRecipe.image}
            alt={selectedRecipe.title}
            className="w-full h-64 object-cover sm:h-80 md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <button
            className="absolute top-4 right-4 text-white hover:bg-white/20 p-2 rounded-full transition-colors duration-200"
            onClick={handleClose}
            aria-label="Close recipe details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="absolute bottom-4 left-0 right-0 text-3xl font-bold text-white text-center">
            {selectedRecipe.title}
          </h2>
        </div>

        <div className="p-6">
          <div className="flex mb-6 border-b dark:border-gray-700 overflow-x-auto">
            {['overview', 'ingredients', 'instructions'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium ${activeTab === tab
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="h-[300px] overflow-y-auto pr-4">
            {activeTab === 'overview' && (
              <div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {selectedRecipe.description}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {/* <strong>Category:</strong> {selectedRecipe.category.name} */}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Author:</strong> {isOwnRecipe ? 'You' : selectedRecipe.author}
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <ul className="space-y-2">
                {selectedRecipe.ingredients?.map((ingredient, index) => (
                  <li key={index} className="flex items-center text-white font-bold ">
                    <span className="h-2 w-2 bg-primary rounded-full mr-2" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'instructions' && (
              <ol className="space-y-4">
                {selectedRecipe.instructions?.map((instruction, index) => (
                  <li key={index} className="flex text-white font-bold">
                    <span className="font-bold text-primary mr-2">
                      {index + 1}.
                    </span>
                    {instruction}
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>

        {recipeFounded && <div className='absolute bottom-0 w-full flex my-3  '>
          <h1 onClick={handleDelete} className='px-4 py-3 rounded-lg text-white bg-red-600 font-bold m-auto hover:scale-75 active:border-white  '>Delete</h1>
        </div>

        }

      </div>

    </div>
  );
};

export default PopCardForRecipe;
