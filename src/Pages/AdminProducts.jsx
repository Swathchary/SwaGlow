import { useEffect, useState } from "react";
import {
    Check,
    X,
    Package,
    RefreshCw,
} from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

const API_URL = "https://glow-mchc.onrender.com/api"; //http://localhost:5000/api

const AdminProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = async () => {

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/products/admin/pending`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.ok && data.status) {
                setProducts(data.products || []);
            } else {
                setMessage(data.message || "Failed to load products");
            }

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to the server"
            );

        } finally {

            setLoading(false);

        }
    };


    const updateProductStatus = async (id, action) => {

        try {

            setActionLoading(id);

            const token = localStorage.getItem("token");

            const endpoint =
                action === "approve"
                    ? `${API_URL}/products/admin/${id}/approve`
                    : `${API_URL}/products/admin/${id}/reject`;


            const response = await fetch(endpoint, {
                method: "PUT",

                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });


            const data = await response.json();


            if (!response.ok || !data.status) {

                setMessage(
                    data.message || "Action failed"
                );

                return;

            }


            setMessage(data.message);


            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) => product._id !== id
                )
            );

        } catch (error) {

            console.error(error);

            setMessage(
                "Unable to connect to the server"
            );

        } finally {

            setActionLoading(null);

        }
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <AdminNavbar />


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* HEADER */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">

                    <div>

                        <h2 className="text-3xl font-black text-gray-900 dark:text-white">
                            Product Approval
                        </h2>

                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            Review products submitted by salespersons.
                        </p>

                    </div>


                    <button
                        onClick={fetchProducts}
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >

                        <RefreshCw size={18} />

                        Refresh

                    </button>

                </div>


                {/* MESSAGE */}

                {message && (

                    <div className="mb-6 p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">

                        {message}

                    </div>

                )}


                {/* LOADING */}

                {loading ? (

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-12 text-center">

                        <RefreshCw
                            size={35}
                            className="mx-auto animate-spin text-purple-600"
                        />

                        <p className="mt-4 text-gray-500">
                            Loading products...
                        </p>

                    </div>

                ) : products.length === 0 ? (

                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">

                        <Package
                            size={55}
                            className="mx-auto text-gray-400"
                        />

                        <h3 className="text-xl font-bold mt-4 dark:text-white">
                            No pending products
                        </h3>

                        <p className="text-gray-500 mt-2">
                            There are currently no products waiting for approval.
                        </p>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {products.map((product) => (

                            <div
                                key={product._id}
                                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm"
                            >

                                {/* IMAGE */}

                                <div className="h-56 bg-gray-100 dark:bg-gray-800">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />

                                </div>


                                {/* DETAILS */}

                                <div className="p-5">

                                    <div className="flex items-start justify-between gap-3">

                                        <div>

                                            <h3 className="text-lg font-bold dark:text-white">
                                                {product.name}
                                            </h3>

                                            <p className="text-sm text-purple-600 font-semibold mt-1">
                                                {product.category}
                                            </p>

                                        </div>

                                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                            Pending
                                        </span>

                                    </div>


                                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-3 line-clamp-3">
                                        {product.description}
                                    </p>


                                    <div className="flex items-center justify-between mt-4">

                                        <span className="text-xl font-black dark:text-white">
                                            ₹{product.price}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            Stock: {product.stock}
                                        </span>

                                    </div>


                                    {/* SALESPERSON */}

                                    <div className="mt-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800">

                                        <p className="text-xs text-gray-500">
                                            Submitted by
                                        </p>

                                        <p className="text-sm font-semibold dark:text-white">
                                            {product.createdBy?.name ||
                                                "Salesperson"}
                                        </p>

                                        <p className="text-xs text-gray-500">
                                            {product.createdBy?.email || ""}
                                        </p>

                                    </div>


                                    {/* ACTIONS */}

                                    <div className="grid grid-cols-2 gap-3 mt-5">

                                        <button
                                            disabled={
                                                actionLoading === product._id
                                            }
                                            onClick={() =>
                                                updateProductStatus(
                                                    product._id,
                                                    "approve"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold disabled:opacity-50"
                                        >

                                            <Check size={19} />

                                            Approve

                                        </button>


                                        <button
                                            disabled={
                                                actionLoading === product._id
                                            }
                                            onClick={() =>
                                                updateProductStatus(
                                                    product._id,
                                                    "reject"
                                                )
                                            }
                                            className="flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold disabled:opacity-50"
                                        >

                                            <X size={19} />

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </main>

        </div>
    );
};

export default AdminProducts;