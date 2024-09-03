import React from 'react';

const RecipeList = () => {
  const recipes = [
    {
      title: 'Grilled Chicken Salad',
      description: 'A fresh and flavorful salad with grilled chicken, mixed greens, and a tangy vinaigrette.',
      rating: '4.5',
      imgSrc: '/placeholder.svg',
      altText: 'Grilled Chicken Salad'
    },
    // Add more recipe objects here
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <div
          key={recipe.title}
          className="rounded-lg border bg-card text-card-foreground shadow-sm relative group"
        >
          <a className="absolute inset-0 z-10" href="#" rel="ugc">
            <span className="sr-only">View recipe</span>
          </a>
          <img
            src={recipe.imgSrc}
            alt={recipe.altText}
            width="400"
            height="300"
            className="rounded-lg object-cover w-full aspect-[4/3] group-hover:opacity-50 transition-opacity"
          />
          <div className="p-4">
            <h3 className="font-semibold text-lg">{recipe.title}</h3>
            <p className="text-muted-foreground line-clamp-2">
              {recipe.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 fill-primary"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-sm">{recipe.rating}</span>
              </div>
              <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
