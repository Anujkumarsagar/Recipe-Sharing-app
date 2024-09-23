import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function PopularChefs() {
  const theme = useSelector((state) => state.user.theme); // Fixed theme selector
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get('api/user/all-users');
        setChefs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch chefs. Please try again later.');
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section className={`py-12 px-4 md:px-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Meet Our Chefs</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {chefs && chefs.length > 0 ? (
            chefs.map((chef) => (
              <ChefCard key={chef._id} {...chef} />
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
    <div className="bg-white border-2 border-slate-300 hover:scale-105 transition-all scroll-smooth rounded-lg shadow-md hover:shadow-lg overflow-hidden">
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
