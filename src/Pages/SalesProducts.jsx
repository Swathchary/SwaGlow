import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, RefreshCw, Package } from "lucide-react";
import SalesNavbar from "../components/SalesNavbar";

const SalesProducts = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                "https://glow-mchc.onrender.com/api/products/my-products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to fetch products"
                );
            }

            setProducts(data.products || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(
        (product) =>
            filter === "all" || product.status === filter
    );

    const statusStyle = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            <SalesNavbar />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black dark:text-white">
                            My Products
                        </h1>

                        <p className="text-gray-500 mt-2">
                            View your products and their approval status.
                        </p>
                    </div>

                    <Link
                        to="/sales/add-product"
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold"
                    >
                        <PlusCircle size={20} />
                        Add Product
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex flex-wrap gap-2">
                        {["all", "pending", "approved", "rejected"].map(
                            (item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`px-4 py-2 rounded-xl font-medium capitalize ${
                                        filter === item
                                            ? "bg-purple-600 text-white"
                                            : "bg-white dark:bg-gray-800 dark:text-white border dark:border-gray-700"
                                    }`}
                                >
                                    {item}
                                </button>
                            )
                        )}
                    </div>

                    <button
                        onClick={fetchProducts}
                        disabled={loading}
                        className="flex items-center gap-2 text-purple-600 disabled:opacity-50"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>

                {error && (
                    <p className="p-4 mb-6 bg-red-50 text-red-700 rounded-xl">
                        {error}
                    </p>
                )}

                {loading ? (
                    <p className="text-gray-500">
                        Loading products...
                    </p>
                ) : filteredProducts.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 p-12 rounded-2xl text-center">
                        <Package
                            size={48}
                            className="mx-auto text-gray-400"
                        />
                        <p className="mt-4 text-gray-500">
                            No products found.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <article
                                key={product._id}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-52 object-cover bg-gray-100"
                                />

                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2">
                                        <h2 className="font-bold text-lg dark:text-white">
                                            {product.name}
                                        </h2>

                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                                                statusStyle[product.status] ||
                                                statusStyle.pending
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </div>

                                    <p className="text-sm text-purple-600 mt-2">
                                        {product.category}
                                    </p>

                                    <p className="text-sm text-gray-500 mt-3 line-clamp-2">
                                        {product.description}
                                    </p>

                                    <div className="flex items-center justify-between mt-5">
                                        <span className="text-xl font-bold dark:text-white">
                                            ₹{product.price}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            Stock: {product.stock}
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default SalesProducts;