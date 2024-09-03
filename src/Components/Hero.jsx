import { useState } from "react";
import { Link } from "react-router-dom";
import CarouselJSX from "../Utils/CarouselJSX";
export default function Hero() {
    return (
        <div className="flex flex-col w-4/5 m-auto ">
            {/* Hero Section */}
            <section className="  py-12 md:py-24 lg:py-32">
                <div className="container  m-auto  justify-between grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-6">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                Discover Our Delicious Recipes
                            </h1>
                            <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                Explore a wide variety of mouthwatering dishes, from classic favorites to innovative creations.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <SearchInput />
                            <FilterDropdown />
                        </div>
                        <div>
                            {/* <Link
                                to="/Recipes"
                                className="bg-blue-600 p-4 rounded-full text-white font-bold hover:bg-blue-700"
                            >
                                Explore More Recipes
                            </Link> */}
                        </div>
                    </div>
                    {/* Hero Image Section */}
                    <div className="relative border-black border-2 overflow-hidden rounded-lg group">
                        <a href="#" className="absolute inset-0 z-10">
                            <span className="sr-only">View Recipe</span>
                        </a>
                        <img
                            src="https://images.unsplash.com/photo-1571074635691-b910c7a5cdbb?q=80&w=1503&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Popular Dish"
                            width={600}
                            height={400}
                            className="object-cover w-full h-80 sm:h-96 md:h-[400px] group-hover:opacity-50 transition-opacity"
                            style={{ aspectRatio: "600/400", objectFit: "cover" }}
                        />
                        <div className="absolute bottom-0 bg-white bg-opacity-50 h-fit flex flex-col justify-end p-6 bg-gradient-to-t from-background/80 to-background/0">
                            <div>
                                <h2 className="text-2xl font-bold text-foreground">Creamy Mushroom Risotto</h2>
                                <p className="text-muted-foreground">
                                    A rich and flavorful risotto made with fresh mushrooms and creamy parmesan.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Recipes Grid Section */}
            <section className="w-full  m-auto  py-12 md:py-24 lg:py-32 bg-muted">
                <div className="container m-auto  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 md:px-6">
                    {recipeData.map((recipe) => (
                        <RecipeCard key={recipe.title} recipe={recipe} />
                    ))}
                </div>
            </section>

            <section>
                <CarouselJSX/>
            </section>
        </div>
    );
}

function SearchInput() {
    return (
        <input
            type="search"
            placeholder="Search recipes..."
            className="flex-1 rounded-md bg-background border border-input px-4 py-2 text-sm"
        />
    );
}

function FilterDropdown() {
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
                className="rounded-md px-4 py-2 text-sm border border-gray-300 flex items-center"
            >
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <div className="p-2">
                        <span className="block  px-4 py-2 text-sm font-medium text-gray-700">Filter by:</span>
                        {Object.keys(filters).map((filter) => (
                            <label
                                key={filter}
                                className="flex items-center justify-between px-4 py-2 text-sm text-gray-700"
                            >
                                {filter}
                                <input
                                    type="checkbox"
                                    checked={filters[filter]}
                                    onChange={() => handleFilterChange(filter)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function RecipeCard({ recipe }) {
    return (
        <div className="relative border-2 p-2 overflow-hidden rounded-lg group">
            <a href="#" className="absolute inset-0 z-10">
                <span className="sr-only">View Recipe</span>
            </a>
            <img
                src={recipe.image}
                alt="Recipe Image"
                width={300}
                height={200}
                className="object-cover w-full h-60 group-hover:opacity-50 transition-opacity"
                style={{ aspectRatio: "300/200", objectFit: "cover" }}
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold text-foreground">{recipe.title}</h3>
                <p className="text-muted-foreground">{recipe.description}</p>
            </div>
        </div>
    );
}

const recipeData = [
    {
        title: "Grilled Salmon with Lemon Dill Sauce",
        description: "Tender salmon fillets grilled to perfection and topped with a bright and tangy lemon dill sauce.",
        image: "https://placehold.co/600x400",
    },
    {
        title: "Vegetable Stir-Fry with Tofu",
        description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
        image: "https://placehold.co/600x400",
    },
    {
        title: "Classic Beef Lasagna",
        description: "Layers of pasta, ground beef, ricotta, and melted cheese baked to perfection.",
        image: "https://placehold.co/600x400",
    },
    {
        title: "Vegetable Stir-Fry with Tofu",
        description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
        image: "https://placehold.co/600x400",
    },
    {
        title: "Classic Beef Lasagna",
        description: "Layers of pasta, ground beef, ricotta, and melted cheese baked to perfection.",
        image: "https://placehold.co/600x400",
    },
        {
            title: "Vegetable Stir-Fry with Tofu",
            description: "A colorful and flavorful stir-fry with fresh vegetables and crispy tofu in a savory sauce.",
            image: "https://placehold.co/600x400",
        },
        {
            title: "Classic Beef Lasagna",
            description: "Layers of pasta, ground beef, ricotta, and melted cheese baked to perfection.",
            image: "https://placehold.co/600x400",
        },
    {
        title: "Lemon Garlic Shrimp Scampi",
        description: "Succulent shrimp in a buttery, garlicky lemon sauce, perfect over pasta or rice.",
        image: "https://placehold.co/600x400",
    },
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
