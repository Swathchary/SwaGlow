import { useEffect, useState, useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { addToCart } = useContext(CartContext);

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch Categories
    const getCategories = async () => {
        try {
            const response = await fetch(
                "https://fakestoreapi.com/products/categories"
            );
            const data = await response.json();

            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    };

    // Fetch Products
    const getProducts = async (category = "all") => {
        try {
            setLoading(true);

            const url =
                category === "all"
                    ? "https://fakestoreapi.com/products"
                    : `https://fakestoreapi.com/products/category/${category}`;

            const response = await fetch(url);
            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);

    const handleCategory = (category) => {
        setSelectedCategory(category);
        getProducts(category);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-10 text-center">
                <h1 className="text-4xl font-bold">Our Products</h1>
                <p className="mt-2">Browse by Category</p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Categories */}
                <div className="flex flex-wrap gap-3 justify-center mb-8">
                    <button
                        onClick={() => handleCategory("all")}
                        className={`px-5 py-2 rounded-full ${
                            selectedCategory === "all"
                                ? "bg-blue-600 text-white"
                                : "bg-white shadow"
                        }`}
                    >
                        All
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleCategory(category)}
                            className={`px-5 py-2 rounded-full capitalize ${
                                selectedCategory === category
                                    ? "bg-blue-600 text-white"
                                    : "bg-white shadow"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products */}
                {loading ? (
                    <h2 className="text-center text-xl font-semibold">
                        Loading...
                    </h2>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full object-contain"
                                />

                                <h3 className="font-semibold text-sm mt-3 h-12 overflow-hidden">
                                    {item.title}
                                </h3>

                                <p className="text-yellow-500 mt-2">
                                    ⭐ {item.rating.rate}
                                </p>

                                <p className="text-green-600 font-bold text-xl mt-2">
                                    ${item.price}
                                </p>

                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-600"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;