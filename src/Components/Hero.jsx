import React, { useState } from "react";
import { Link } from "react-router-dom";
import CarouselJSX from "../Utils/CarouselJSX";
import PopCardForRecipe from "./PopCardForRecipe";
import UserTestimonials from "./UserTestimonials";
import PopularChefs from "./PopularChefs";
import Footer from "./Footer";
import { useSelector } from "react-redux";

export default function Hero() {
    const theme = useSelector((state) => state.user.theme); // Updated to use theme from user slice
    return (
        <div className={`flex flex-col w-full lg:w-[99%]  mx-auto ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
            {/* Video Background Section */}
            <div className="relative overflow-hidden">
                <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-[-1]">
                    <source src="https://videos.pexels.com/video-files/2081576/2081576-hd_1920_1080_30fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Hero Section */}
            <section className={`relative h-full lg:py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                <div className="container mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 h-full">
                    {/* Hero Text Section */}
                    <div className="flex flex-col justify-center space-y-6 text-center md:text-left h-full">
                        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gradient">
                            Discover Our Delicious Recipes
                        </h1>
                        <p className={`max-w-md mx-auto md:mx-0 text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                            Explore a wide variety of mouthwatering dishes, from classic favorites to innovative creations.
                        </p>

                        {/* Search and Filter Section */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <SearchInput theme={theme} />
                            <FilterDropdown theme={theme} />
                        </div>
                    </div>

                    {/* Hero Image Section */}
                    <div className="relative overflow-hidden rounded-lg shadow-xl group h-full">
                        <Link to="#" className="absolute inset-0 z-10">
                            <span className="sr-only">View Recipe</span>
                        </Link>
                        <img
                            src="https://images.unsplash.com/photo-1571074635691-b910c7a5cdbb?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Popular Dish"
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                            <h2 className="text-2xl font-bold mb-2">Creamy Mushroom Risotto</h2>
                            <p className="text-sm">
                                A rich and flavorful risotto made with fresh mushrooms and creamy parmesan.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipes Grid Section */}
            <section className={`w-full py-12 md:py-16 lg:py-20 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-6">
                    {recipeData.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} theme={theme} />
                    ))}
                </div>
            </section>

            {/* Testimonials and Other Sections */}
            <section className={`py-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <CarouselJSX />
            </section>

            <section className={`py-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <UserTestimonials />
            </section>

            <section className={`py-12 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
                <PopularChefs />
            </section>

            <Footer />
        </div>
    );
}


function SearchInput({ theme }) {
    return (
        <input
            type="search"
            placeholder="Search recipes..."
            className={`flex-1 rounded-md border px-4 py-2 text-sm focus:outline-none focus:ring-2 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 focus:ring-purple-400' : 'bg-white border-gray-300 text-gray-700 focus:ring-purple-500'}`}
        />
    );
}

function FilterDropdown({ theme }) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState({
        Appetizers: true,
        Entrees: true,
        Desserts: false,
        Vegetarian: false,
        "Gluten-free": false,
    });

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleFilterChange = (filter) => {
        setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className={`z-50 rounded-md px-4 py-2 text-sm border flex items-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
            </button>
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-10 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                    <div className="p-2">
                        <span className={`block px-4 py-2 text-sm font-medium transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Filter by:</span>
                        {Object.keys(filters).map((filter) => (
                            <label
                                key={filter}
                                className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors duration-300 ${theme === 'dark' ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                {filter}
                                <input
                                    type="checkbox"
                                    checked={filters[filter]}
                                    onChange={() => handleFilterChange(filter)}
                                    className={`form-checkbox h-4 w-4 transition duration-150 ease-in-out ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function RecipeCard({ recipe, theme }) {
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const handleCloseRecipe = () => {
        setSelectedRecipe(null);
    };

    return (
        <div className={`relative overflow-hidden rounded-lg shadow-md group transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <Link
                to="#"
                className="absolute inset-0 z-10"
                onClick={(e) => {
                    e.preventDefault();
                    setSelectedRecipe(recipe);
                }}
            >
                <span className="sr-only">View Recipe</span>
            </Link>
            <img
                src={recipe.image}
                alt={recipe.title}
                width={300}
                height={200}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <div className="p-4">
                <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{recipe.title}</h3>
                <p className={`text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{recipe.description}</p>
            </div>
            {selectedRecipe && (
                <PopCardForRecipe
                    handleCloseRecipe={handleCloseRecipe}
                    selectedRecipe={selectedRecipe}
                />
            )}
        </div>
    );
}

const recipeData = [
    {
        id: 1,
        title: "Grilled Salmon with Lemon Dill Sauce",
        description: "Tender salmon fillets grilled to perfection and topped with a bright and tangy lemon dill sauce.",
        image: "https://source.unsplash.com/featured/?salmon",
    },
    {
        id: 2,
        title: "Vegetable Stir-Fry with Tofu",
        description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
        image: "https://source.unsplash.com/featured/?stirfry",
    },
    // Add more recipe data as needed
];

function FilterIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    );
}