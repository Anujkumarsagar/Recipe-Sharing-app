import React from 'react';

export default function UserTestimonials() {
  return (
    <section className="py-12 shadow-sm  px-4 md:px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <TestimonialCard
            name="Priya Sharma"
            avatar="/placeholder.svg?height=40&width=40"
            comment="I love the variety of recipes! The step-by-step instructions make cooking so easy."
            rating={5}
          />
          <TestimonialCard
            name="Rahul Patel"
            avatar="/placeholder.svg?height=40&width=40"
            comment="This website has transformed my cooking skills. The community is so supportive!"
            rating={4}
          />
          <TestimonialCard
            name="Anita Desai"
            avatar="/placeholder.svg?height=40&width=40"
            comment="The recipes are authentic and delicious. I've impressed my family with my new dishes!"
            rating={5}
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ name, avatar, comment, rating }) {
  return (
    <div className="bg-white border-slate-30  0 border-2 p-6 rounded-lg shadow-lg transition-all hover:cursor-auto hover:shadow-2xl">
      <div className="flex items-center space-x-4 mb-4 ">
        <img src={avatar} alt={name} className="w-10 h-20 rounded-full" />
        <div>
          <h3 className="font-semibold">{name}</h3>
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
      <p className="text-gray-600">{comment}</p>
    </div>
  );
}
