import React, { useState, useEffect } from 'react';

// Sample recipe data
const recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    description: "Classic Italian pasta dish with eggs, cheese, and pancetta",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    description: "Creamy and spicy Indian curry with tender chicken pieces",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    description: "Quick and healthy mix of fresh vegetables in a savory sauce",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 4,
    title: "Berry Smoothie Bowl",
    description: "Refreshing blend of mixed berries topped with granola and fruits",
    image: "/placeholder.svg?height=200&width=300"
  }
];

export default function CarouselJSX() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleItems(3);
      } else if (window.innerWidth >= 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (recipes.length - visibleItems + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + (recipes.length - visibleItems + 1)) % (recipes.length - visibleItems + 1)
    );
  };

  return (
    <div className="relative w-full max-w-[80%] mx-auto overflow-hidden">
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {recipes.map((recipe) => (
            <div 
              key={recipe.id} 
              className="flex-shrink-0 p-2 md:p-4"
              style={{ flex: `0 0 ${100 / visibleItems}%` }}
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
                  <p className="text-gray-600">{recipe.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button 
          onClick={prevSlide} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full shadow-lg"
        >
          &#10094;
        </button>
        <button 
          onClick={nextSlide} 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-800 text-white rounded-full shadow-lg"
        >
          &#10095;
        </button>
      </div>
    </div>
  );
}
