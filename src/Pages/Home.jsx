import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const API_URL = "http://localhost:5000/api/products";

const Home = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] =
        useState("all");

    const [loading, setLoading] = useState(true);

    const [addedProductId, setAddedProductId] =
        useState(null);


    // =================================================
    // GET CATEGORIES
    // =================================================

    const getCategories = async () => {
        try {
            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/categories`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.status) {
                const uniqueCategories = [
                    ...new Set(
                        (data.categories || [])
                            .map((category) => category.trim())
                            .filter(Boolean)
                    ),
                ];

                setCategories(uniqueCategories);
            }

        } catch (error) {
            console.error(
                "Category error:",
                error
            );
        }
    };

    // GET PRODUCTS

    const getProducts = async (
        category = "all"
    ) => {
        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            let url = API_URL;

            if (category !== "all") {
                url =
                    `${API_URL}/category/` +
                    encodeURIComponent(category);
            }

            const response = await fetch(
                url,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (data.status) {
                setProducts(
                    data.products || []
                );
            }

        } catch (error) {
            console.error(
                "Products error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    // =================================================
    // INITIAL LOAD
    // =================================================

    useEffect(() => {
        getCategories();
        getProducts();
    }, []);


    // =================================================
    // CATEGORY
    // =================================================

    const handleCategory = (category) => {
        setSelectedCategory(category);

        getProducts(category);
    };


    // =================================================
    // ADD CART
    // =================================================

    const handleAddToCart = (
        event,
        product
    ) => {
        event.stopPropagation();

        addToCart(product);

        setAddedProductId(
            product._id
        );

        setTimeout(() => {
            setAddedProductId(null);
        }, 1500);
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* HEADER */}

            <section className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-12 text-center">

                <h1 className="text-3xl sm:text-4xl font-bold">
                    Our Products
                </h1>

                <p className="mt-2">
                    Browse by Category
                </p>

            </section>


            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">


                {/* CATEGORIES */}

                <div className="flex flex-wrap gap-3 justify-center mb-8">

                    <button
                        type="button"
                        onClick={() =>
                            handleCategory("all")
                        }
                        className={`px-5 py-2 rounded-full font-medium ${selectedCategory === "all"
                                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow"
                            }`}
                    >
                        All
                    </button>


                    {categories.map(
                        (category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() =>
                                    handleCategory(
                                        category
                                    )
                                }
                                className={`px-5 py-2 rounded-full capitalize font-medium ${selectedCategory ===
                                        category
                                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                        : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow"
                                    }`}
                            >
                                {category}
                            </button>
                        )
                    )}

                </div>


                {/* PRODUCTS */}

                {loading ? (

                    <div className="text-center py-20">

                        <p className="text-xl font-semibold text-pink-600">
                            Loading products...
                        </p>

                    </div>

                ) : products.length === 0 ? (

                    <div className="text-center py-20">

                        <p className="text-xl font-semibold text-gray-700 dark:text-gray-200">
                            No approved products available
                        </p>

                        <p className="text-gray-500 mt-2">
                            Products will appear here after admin approval.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.map(
                            (product) => (

                                <div
                                    key={
                                        product._id
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/customer/products/${product._id}`
                                        )
                                    }
                                    className="bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-xl transition p-4 cursor-pointer border border-gray-100 dark:border-gray-800"
                                >

                                    {/* IMAGE */}

                                    <div className="h-48 flex items-center justify-center">

                                        <img
                                            src={
                                                product.image
                                            }
                                            alt={
                                                product.name
                                            }
                                            className="h-44 w-full object-contain"
                                        />

                                    </div>


                                    {/* CATEGORY */}

                                    <p className="text-xs uppercase font-semibold text-pink-600 mt-3">
                                        {
                                            product.category
                                        }
                                    </p>


                                    {/* NAME */}

                                    <h3 className="font-semibold text-sm mt-2 h-12 overflow-hidden text-gray-800 dark:text-gray-100">
                                        {
                                            product.name
                                        }
                                    </h3>


                                    {/* PRICE */}

                                    <p className="text-pink-600 dark:text-pink-400 font-bold text-xl mt-2">
                                        ₹
                                        {
                                            product.price
                                        }
                                    </p>


                                    {/* STOCK */}

                                    <p className="text-sm text-gray-500 mt-1">
                                        Stock:{" "}
                                        {
                                            product.stock
                                        }
                                    </p>


                                    {/* CART */}

                                    <button
                                        type="button"
                                        onClick={(
                                            event
                                        ) =>
                                            handleAddToCart(
                                                event,
                                                product
                                            )
                                        }
                                        className={`w-full mt-4 py-2.5 rounded-lg font-semibold text-white transition ${addedProductId ===
                                                product._id
                                                ? "bg-green-500"
                                                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                                            }`}
                                    >
                                        {addedProductId ===
                                            product._id
                                            ? "✓ Added"
                                            : "Add to Cart"}
                                    </button>

                                </div>
                            )
                        )}

                    </div>

                )}

            </main>

        </div>
    );
};

export default Home;