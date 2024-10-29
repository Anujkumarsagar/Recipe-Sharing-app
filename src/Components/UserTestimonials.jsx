import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedback } from '../store/recipeSlice';

export default function UserTestimonials() {
  const theme = useSelector((state) => state.user.theme); // Get theme from Redux store
  const dispatch = useDispatch(); // Correctly use dispatch
  const feedbackList = useSelector((state) => state.recipe.feedback); // Assuming your feedback is stored here
  
  
  useEffect(() => {
    dispatch(getFeedback()); // Fetch feedback on component mount
  }, [dispatch]);
  
  return (
    <section className={`py-12 shadow-sm px-4 md:px-6 z-10`}>
      <div className="max-w-6xl mx-auto">
        <h2 className={` text-4xl md:text-5xl font-bold text-right mb-8 text-gray-800  flex-nowrap  `}>What Our Users Say</h2>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
          {feedbackList.slice(0,4).map((feedback) => (
            <TestimonialCard
              key={feedback.id} // Assuming feedback has a unique id
              name={feedback.name}
              comment={feedback.message} // Adjust based on your data structure
              rating={feedback.rating} // Assuming rating is part of the feedback
              theme={theme}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, comment, rating, theme }) {
  return (
    <div className={`p-6 rounded-lg shadow-lg transition-all hover:cursor-auto hover:shadow-2xl ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-300'} border-2`}>
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{name}</h3>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <p className={`text-gray-600 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{comment}</p>
    </div>
  );
}
