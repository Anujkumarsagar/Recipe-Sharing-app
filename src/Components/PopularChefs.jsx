import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../store/userSlice';

export default function PopularChefs() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.user.theme);
  const allusers = useSelector((state) => state.user.allUser); // Assuming allUser is an array now

  console.log("allusers", allusers);
  const loading = useSelector((state) => state.user.loading); // Add loading from the user state
  const error = useSelector((state) => state.user.error); // Add error from the user state

  const chefRef = useRef(null);

const scrollToChefs = () => {
    chefRef.current?.scrollIntoView({ behavior: 'smooth' });
};


  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <section  className={`py-12 px-4 md:px-6`}>
      <div ref={chefRef} id="meetourchef" className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Meet Our Chefs</h2>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {allusers.users && allusers.users.length > 0 ? (
            allusers.users.slice(0,3).map((chef , key) => (
              <ChefCard ref={chefRef} key={key} chef={chef} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No chefs available at the moment.</p>
          )}
        </div>
      </div>
    </section>
  );
}

function ChefCard({ chef , chefRef}) {
  return (
    <div ref={chefRef} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <img src={chef.profilePic} alt={chef.userName} className="object-cover w-full rounded-t-lg h-6-50 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" /> {/* Access chef.image directly */}
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{chef.userName}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{chef.bio}</p>
        <div>
          <h4 className="font-semibold mb-2 text-gray-400">Top Recipes:</h4>
          {chef.recipes && chef.recipes.length > 0 ? (
            <ul className="list-disc list-inside mb-3  text-gray-700 dark:text-gray-400">
              {chef.recipes.slice(0, 3).map((recipe, index) => (
                <li key={index}>{recipe.title}</li>
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
