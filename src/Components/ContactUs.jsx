import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from './Navbar';

export default function ContactUs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out">
        <Navbar/>
      <div className="max-w-3xl mt-6 mx-auto">
        <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-indigo-400 mb-2 animate-fade-in-down">
              Contact Us
            </h1>
            <p className="text-center text-gray-400 mb-8 animate-fade-in-up">
              We'd love to hear from you! Send us a message and we'll get back to you as soon as possible.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="animate-fade-in-left">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-400">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                    placeholder="Your name"
                  />
                </div>
                <div className="animate-fade-in-right">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="animate-fade-in-up">
                <label htmlFor="message" className="block text-sm font-medium text-gray-400">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition-all duration-300 ease-in-out"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <div className="animate-fade-in-up">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            { icon: Mail, title: "Email Us", content: "contact@recipeapp.com", href: "mailto:contact@recipeapp.com" },
            { icon: Phone, title: "Call Us", content: "+1 (234) 567-890", href: "tel:+1234567890" },
            { icon: MapPin, title: "Visit Us", content: "123 Recipe Street\nFoodville, FK 12345" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ease-in-out animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="px-6 py-8 flex flex-col items-center">
                <item.icon className="h-10 w-10 text-indigo-400 mb-4 animate-pulse" />
                <h2 className="text-lg font-semibold text-indigo-400 mb-2">{item.title}</h2>
                <p className="text-center text-gray-400">
                  {item.href ? (
                    <a href={item.href} className="text-indigo-400 hover:underline">
                      {item.content}
                    </a>
                  ) : (
                    item.content.split('\n').map((line, i) => <span key={i} className="block">{line}</span>)
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
