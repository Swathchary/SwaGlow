import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
    Search,
    ShoppingCart,
    ArrowRight,
    Sparkles,
} from "lucide-react";

import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const { products, loading, error } = useProducts();
    const { cartItems } = useCart();

    // Create unique categories from MongoDB products
    const categories = useMemo(() => {
        const categoryMap = new Map();

        products.forEach((product) => {
            const category = product.category?.trim();

            if (!category) return;

            const key = category.toLowerCase();

            if (!categoryMap.has(key)) {
                categoryMap.set(key, category);
            }
        });

        return Array.from(categoryMap.values()).sort();
    }, [products]);

    // Show latest 4 products on Home
    const featuredProducts = products.slice(0, 4);

    const handleCategoryClick = (category) => {
        navigate(
            `/customer/products?category=${encodeURIComponent(category)}`
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            {/* HERO SECTION */}
            <section className="px-4 sm:px-6 lg:px-8 pt-6">
                <div className="max-w-7xl mx-auto">

                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-8 sm:p-12">

                        {/* Decorative circles */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
                        <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-white/10 rounded-full" />

                        <div className="relative z-10 max-w-2xl">

                            <div className="flex items-center gap-2 text-white/90 mb-4">
                                <Sparkles size={20} />
                                <span className="font-medium">
                                    Welcome to SwaGlow
                                </span>
                            </div>

                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                                Discover Products
                                <br />
                                You’ll Love
                            </h1>

                            <p className="mt-5 text-white/80 text-base sm:text-lg max-w-xl">
                                Explore our collection of approved products
                                and find something special for you.
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/customer/products")
                                    }
                                    className="flex items-center gap-2 bg-white text-purple-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
                                >
                                    Shop Now
                                    <ArrowRight size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/customer/cart")
                                    }
                                    className="flex items-center gap-2 bg-white/15 text-white border border-white/30 px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition"
                                >
                                    <ShoppingCart size={18} />
                                    Cart ({cartItems?.length || 0})
                                </button>

                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* SEARCH */}
            <section className="px-4 sm:px-6 lg:px-8 mt-8">
                <div className="max-w-7xl mx-auto">

                    <div className="relative">

                        <Search
                            size={20}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search products..."
                            onFocus={() =>
                                navigate("/customer/products")
                            }
                            className="
                                w-full
                                pl-12
                                pr-4
                                py-4
                                rounded-2xl
                                border
                                border-gray-200
                                dark:border-gray-800
                                bg-white
                                dark:bg-gray-900
                                text-gray-800
                                dark:text-white
                                outline-none
                                focus:ring-2
                                focus:ring-purple-500
                            "
                        />

                    </div>

                </div>
            </section>

            {/* CATEGORIES */}
            {!loading && categories.length > 0 && (
                <section className="px-4 sm:px-6 lg:px-8 mt-8">
                    <div className="max-w-7xl mx-auto">

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                                Shop by Category
                            </h2>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/customer/products")
                                }
                                className="text-purple-600 dark:text-purple-400 font-semibold"
                            >
                                View All
                            </button>
                        </div>

                        <div className="flex gap-3 overflow-x-auto pb-2">

                            {categories.map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className="
                                        flex-shrink-0
                                        px-5
                                        py-3
                                        rounded-full
                                        bg-white
                                        dark:bg-gray-900
                                        border
                                        border-gray-200
                                        dark:border-gray-800
                                        text-gray-700
                                        dark:text-gray-200
                                        font-semibold
                                        hover:border-purple-500
                                        hover:text-purple-600
                                        transition
                                    "
                                >
                                    {category}
                                </button>
                            ))}

                        </div>

                    </div>
                </section>
            )}

            {/* FEATURED PRODUCTS */}
            <section className="px-4 sm:px-6 lg:px-8 mt-10 pb-12">
                <div className="max-w-7xl mx-auto">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">
                                Latest Products
                            </h2>

                            <p className="text-gray-500 dark:text-gray-400 mt-1">
                                Explore our newest products
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/customer/products")
                            }
                            className="
                                hidden
                                sm:flex
                                items-center
                                gap-2
                                text-purple-600
                                dark:text-purple-400
                                font-bold
                            "
                        >
                            View All
                            <ArrowRight size={18} />
                        </button>

                    </div>

                    {/* LOADING */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="
                                        h-96
                                        rounded-2xl
                                        bg-gray-200
                                        dark:bg-gray-800
                                        animate-pulse
                                    "
                                />
                            ))}

                        </div>
                    )}

                    {/* ERROR */}
                    {!loading && error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">

                            <p className="text-red-600 dark:text-red-400 font-semibold">
                                {error}
                            </p>

                        </div>
                    )}

                    {/* EMPTY */}
                    {!loading && !error && featuredProducts.length === 0 && (
                        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">

                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                No products available
                            </h3>

                            <p className="mt-2 text-gray-500 dark:text-gray-400">
                                Approved products will appear here.
                            </p>

                        </div>
                    )}

                    {/* PRODUCTS */}
                    {!loading && !error && featuredProducts.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            {featuredProducts.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}

                        </div>
                    )}

                    {/* MOBILE VIEW ALL */}
                    {!loading &&
                        !error &&
                        featuredProducts.length > 0 && (
                            <div className="mt-8 flex justify-center sm:hidden">

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/customer/products")
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        px-6
                                        py-3
                                        rounded-xl
                                        bg-gradient-to-r
                                        from-pink-500
                                        to-purple-600
                                        text-white
                                        font-bold
                                    "
                                >
                                    View All Products
                                    <ArrowRight size={18} />
                                </button>

                            </div>
                        )}

                </div>
            </section>

        </div>
    );
};

export default CustomerDashboard;