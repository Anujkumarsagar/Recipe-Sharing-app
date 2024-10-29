'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createFeedback } from '../store/recipeSlice';

export default function FeedbackForm() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState(currentUser.email || ''); // Initialize with currentUser email
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    // Basic validation
    if (!name || !email || !message || rating === 0) {
      setError('Please fill in all fields and provide a rating.');
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }

    try {
      // Create feedback using the dispatch
      await dispatch(createFeedback({ name, email, message, rating })).unwrap();

      // Reset form fields
      setName('');
      setMessage('');
      setRating(0);
      setIsSubmitted(true);
    } catch (error) {
      setError('An error occurred while submitting your feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
      // Hide success message after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="max-w-md mx-3 md:mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-md sm:p-8 lg:max-w-lg">
      <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
      {isSubmitted ? (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6" role="alert">
          <p className="font-bold">Thank you for your feedback!</p>
          <p>We appreciate your input and will review it shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
              readOnly={!!currentUser.email} // Makes the input uneditable if currentUser.email exists
            />
          </div>
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-white">
              Rating
            </label>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-400'} hover:text-yellow-500`}
                  onClick={() => setRating(star)}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-white">
              Feedback
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              required
            ></textarea>
          </div>
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      )}
    </div>
  );
}
