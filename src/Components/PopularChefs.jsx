import React from 'react';

export default function PopularChefs() {
  const chefs = [
    {
      name: "Sanjeev Kapoor",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Master chef known for innovative Indian cuisine",
      topRecipes: ["Butter Chicken", "Shahi Paneer", "Tandoori Roti"]
    },
    {
      name: "Tarla Dalal",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Renowned for vegetarian and healthy recipes",
      topRecipes: ["Dhokla", "Pav Bhaji", "Vegetable Biryani"]
    },
    {
      name: "Vikas Khanna",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Michelin-starred chef specializing in modern Indian cuisine",
      topRecipes: ["Amritsari Fish", "Mango Lassi", "Spiced Lamb Shanks"]
    }
  ];

  return (
    <section className="py-12 px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Chefs</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {chefs && chefs.length > 0 ? (
            chefs.map((chef, index) => (
              <ChefCard key={index} {...chef} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No chefs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ChefCard({ name, image, bio, topRecipes }) {
  return (
    <div className="bg-white border-2 border-slate-300 hover:scale-105 transition-all scroll-smooth rounded-lg shadow-md hover:shadow-lg  overflow-hidden">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-4">{bio}</p>
        <div>
          <h4 className="font-semibold mb-2">Top Recipes:</h4>
          {topRecipes && topRecipes.length > 0 ? (
            <ul className="list-disc list-inside text-gray-600">
              {topRecipes.map((recipe, index) => (
                <li key={index}>{recipe}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recipes available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
