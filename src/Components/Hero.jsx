import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import CarouselJSX from "../Utils/CarouselJSX";
import PopCardForRecipe from "./PopCardForRecipe";
import UserTestimonials from "./UserTestimonials";
import PopularChefs from "./PopularChefs";
import Footer from "./Footer";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./Navbar";
import { getAllRecipes } from "../store/recipeSlice";
import { gsap } from "gsap";

export default function Hero() {
    const theme = useSelector((state) => state.user.theme);
    const dispatch = useDispatch();
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const heroRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 6;
    const [isGsapDone, setIsGsapDone] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await dispatch(getAllRecipes()).unwrap();
                if (response.success) {
                    setRecipes(response.data);
                    console.log("Recipes", response.data)
                }
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            }
        };
        fetchRecipes();

        // GSAP animation for entering from bottom to top
        if (!isGsapDone) {
            gsap.fromTo(heroRef.current,
                { y: '100%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 2, ease: "power3.out", delay: 2, onComplete: () => setIsGsapDone(true) }
            );
        }
    }, []);


    const handleRecipeClick = (recipeId) => {
        const recipe = recipes.find(r => r._id === recipeId);
        setSelectedRecipe(recipe);
    };



    const handleCloseRecipe = () => {
        setSelectedRecipe(null);
    };

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="relative">
            <div className="recipe-popup-containe fixed  z-50 right-0 top-0  ">
                {selectedRecipe && (
                    <PopCardForRecipe
                        selectedRecipe={selectedRecipe}
                        handleCloseRecipe={handleCloseRecipe}
                        className="recipe-popup "
                    />
                )}
            </div>

            <div className={`  contrast-125 flex flex-col gap-4`} ref={heroRef}>
                <div className={`h-[96vh] rounded-lg overflow-hidden flex flex-col w-full mx-auto transition-colors duration-300 relative`} >

                    <div className="top-0 z-50 p-6"><Navbar theme={theme} /></div>
                    {/* Video Background Section */}
                    <div className="absolute w-full overflow-hidden rounded-lg">
                        <div className="inset-0 filter w-full  blur-2"></div>
                        <video autoPlay muted loop className="object-cover w-full h-[97vh] filter brightness-150">
                            <source src="https://videos.pexels.com/video-files/6069115/6069115-sd_640_360_30fps.mp4" type="video/mp4" />
                        </video>
                    </div>

                    {/* Hero Section */}
                    <section className="h-full relative lg:py-12">
                        <div className="container mx-auto  relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6 h-full">
                            {/* Hero Text Section */}
                            <div className="flex flex-col justify-center space-y-6 text-center md:text-left h-full">
                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-gradient text-white">
                                    Discover Our Delicious Recipes
                                </h1>
                                <p className={`max-w-md mx-auto md:mx-0 text-lg md:text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                                    Explore a wide variety of mouthwatering dishes, from classic favorites to innovative creations.
                                </p>

                                {/* Search and Filter Section */}
                                <div className="flex-col sm:flex-row gap-4 justify-center md:justify-start hidden md:flex">
                                    <SearchInput theme={theme} setSearchTerm={setSearchTerm} />
                                    <FilterDropdown theme={theme} />
                                </div>
                            </div>

                            {/* Hero Image Section */}
                            <div className="relative scale-95 md:scale-100 overflow-hidden rounded-lg shadow-xl group h-full opacity-60 hover:zoomin hover:opacity-100 transition-opacity duration-300">
                                <Link to="#" className="absolute inset-0 z-10">
                                    <span className="sr-only">View Recipe</span>
                                </Link>
                                <img
                                    src="https://images.unsplash.com/photo-1571074635691-b910c7a5cdbb?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Popular Dish"
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white bg-black md:opacity-100 opacity-30">
                                    <h2 className="md:text-2xl font-bold mb-2">Creamy Mushroom Risotto</h2>
                                    <p className="md:text-sm text-xs">
                                        A rich and flavorful risotto made with fresh mushrooms and creamy parmesan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Recipes Grid Section */}
                <section className={`md:py-5 w-full m-auto duration-300 relative`}>
                    <div className={`rounded-2xl overflow-hidden dark-mode w-full filter brightness-95 contrast-95`}>
                        <div className="background h-[250rem] md:h-[300vh] transition-colors w-full bg-[linear-gradient(#000000_-8%,_#00000024_10%,_#ff000000_30%,_#ffff0000_80%,_black_100%)]">
                        </div>
                    </div>
                    <div className="absolute top-0 w-full px-4 sm:px-6 lg:px-8">
                        <h3 className="text-2xl md:text-3xl lg:text-5xl text-[#FF6F61] text-shadow-lg background-transparent filter brightness-150 contrast-150 text-shadow-white font-bold text-center tracking-tight mb-4 sm:mb-8">
                            Creative and Delicious Recipes
                        </h3>

                        <div className="max-w-6xl mx-auto">
                            {currentRecipes && currentRecipes.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                    {currentRecipes.map((recipe) => (
                                        <RecipeCard
                                            key={recipe._id}
                                            recipe={recipe}
                                            theme={theme}
                                            searchTerm={searchTerm}
                                            onClick={() => handleRecipeClick(recipe._id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-gray-600">No recipes available</div>
                            )}
                        </div>

                        {recipes.length > recipesPerPage && (
                            <div className="flex justify-center mt-6 sm:mt-8">
                                {Array.from({ length: Math.ceil(recipes.length / recipesPerPage) }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => paginate(i + 1)}
                                        className={`mx-1 px-3 py-1 sm:px-4 sm:py-2 border rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                                            } hover:bg-blue-600 hover:text-white transition-colors duration-300 text-sm sm:text-base`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Testimonials and Other Sections */}
                        <section className={`py-8 sm:py-12 z-10 transition-colors duration-300`}>
                            <CarouselJSX />
                        </section>

                        <section className={`py-8 sm:py-12 transition-colors duration-300 z-10`}>
                            <UserTestimonials />
                        </section>

                        <section className={`py-8 sm:py-12 transition-colors duration-300 z-10`}>
                            <PopularChefs />
                        </section>
                    </div>

                </section>
                <Footer />

            </div>
        </div>
    );
}

function SearchInput({ theme, setSearchTerm }) {
    return (
        <input
            type="search"
            placeholder="Search recipes..."
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="">
            <button
                onClick={toggleDropdown}
                className={`z-50 rounded-md px-4 py-2 text-sm border flex items-center transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100'}`}
            >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
            </button>
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-48 border rounded-md shadow-lg z-50 transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
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

function RecipeCard({ recipe, theme, searchTerm, onClick }) {
    return (
        <div
            className={`border border-gray-300 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
            onClick={onClick}
        >
            <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                    {recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ? (
                        <span className="text-[#FF6F61]">{recipe.title}</span>
                    ) : (
                        recipe.title
                    )}
                </h3>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} line-clamp-3`}>{recipe.description}</p>
            </div>
        </div>
    );
}

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