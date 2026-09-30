import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Package,
    Clock,
    CheckCircle,
    XCircle,
    UserPlus,
    ArrowRight,
} from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

const API_URL = "https://glow-mchc.onrender.com/api";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
});

   useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
        navigate("/login");
        return;
    }
    fetchStats(token);

    fetchPendingProducts(token);
}, [navigate]);

    const fetchPendingProducts = async () => {
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
                console.error(data.message);
            }

        } catch (error) {
            console.error("FETCH PENDING PRODUCTS ERROR:", error);
        } finally {
            setLoading(false);
        }
    };

const fetchStats = async (token) => {
    try {
        const response = await fetch(
            "https://glow-mchc.onrender.com/api/products/admin/stats",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await response.json();

        console.log("ADMIN STATS RESPONSE:", data);

        if (!response.ok) {
            throw new Error(
                data.message || "Failed to fetch statistics"
            );
        }

        setStats({
            total: data.stats?.total ?? 0,
            pending: data.stats?.pending ?? 0,
            approved: data.stats?.approved ?? 0,
            rejected: data.stats?.rejected ?? 0,
        });
    } catch (error) {
        console.error("ADMIN STATS ERROR:", error);
    }
};



    const pendingCount = products.length;


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">

            <AdminNavbar />


            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* HEADER */}

                <div className="mb-8">

                    <h2 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                        Admin Dashboard
                    </h2>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Manage products and salesperson accounts.
                    </p>

                </div>


                {/* STAT CARDS */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


                    {/* TOTAL PENDING */}

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Pending Products
                                </p>

                                <p className="text-3xl font-black mt-2 dark:text-white">
                                    {pendingCount}
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">

                                <Clock
                                    size={24}
                                    className="text-yellow-600"
                                />

                            </div>

                        </div>

                    </div>


                    {/* APPROVED */}
<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

    <div className="flex items-center justify-between">

        <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
                Approved
            </p>

            <p className="text-3xl font-black mt-2 dark:text-white">
                {stats.approved}
            </p>

        </div>

        <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">

            <CheckCircle
                size={24}
                className="text-green-600"
            />

        </div>

    </div>

</div>

                    {/* REJECTED */}

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Rejected
                                </p>

                                <p className="text-3xl font-black mt-2 dark:text-white">
                                                    {stats.rejected}

                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">

                                <XCircle
                                    size={24}
                                    className="text-red-600"
                                />

                            </div>

                        </div>

                    </div>


                    {/* PRODUCTS */}

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm">

                        <div className="flex items-center justify-between">

                            <div>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Pending Review
                                </p>

                                <p className="text-3xl font-black mt-2 dark:text-white">
                                    {products.length}
                                </p>

                            </div>

                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

                                <Package
                                    size={24}
                                    className="text-purple-600"
                                />

                            </div>

                        </div>

                    </div>

                </div>


                {/* QUICK ACTIONS */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">


                    <button
                        onClick={() => navigate("/admin/products")}
                        className="text-left bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-6 text-white hover:opacity-95 transition shadow-lg"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <Package size={30} />

                                <h3 className="text-xl font-bold mt-4">
                                    Review Products
                                </h3>

                                <p className="text-white/80 mt-1">
                                    Approve or reject products submitted by salespersons.
                                </p>

                            </div>

                            <ArrowRight size={26} />

                        </div>

                    </button>


                    <button
                        onClick={() => navigate("/admin/create-salesperson")}
                        className="text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:border-pink-400 transition shadow-sm"
                    >

                        <div className="flex items-center justify-between">

                            <div>

                                <UserPlus
                                    size={30}
                                    className="text-purple-600"
                                />

                                <h3 className="text-xl font-bold mt-4 dark:text-white">
                                    Create Salesperson
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 mt-1">
                                    Create an account for a new salesperson.
                                </p>

                            </div>

                            <ArrowRight
                                size={26}
                                className="text-purple-600"
                            />

                        </div>

                    </button>

                </div>


                {/* PENDING PRODUCTS */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">

                    <div className="p-6 border-b border-gray-200 dark:border-gray-800">

                        <div className="flex items-center justify-between">

                            <div>

                                <h3 className="text-xl font-bold dark:text-white">
                                    Products Waiting for Approval
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    Review products submitted by salespersons.
                                </p>

                            </div>

                            <button
                                onClick={() => navigate("/admin/products")}
                                className="text-sm font-semibold text-purple-600 hover:text-pink-500"
                            >
                                View All
                            </button>

                        </div>

                    </div>


                    {loading ? (

                        <div className="p-10 text-center text-gray-500">
                            Loading products...
                        </div>

                    ) : products.length === 0 ? (

                        <div className="p-10 text-center">

                            <CheckCircle
                                size={45}
                                className="mx-auto text-green-500 mb-3"
                            />

                            <h4 className="font-semibold dark:text-white">
                                No pending products
                            </h4>

                            <p className="text-sm text-gray-500 mt-1">
                                All submitted products have been reviewed.
                            </p>

                        </div>

                    ) : (

                        <div className="divide-y divide-gray-200 dark:divide-gray-800">

                            {products.slice(0, 5).map((product) => (

                                <div
                                    key={product._id}
                                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                                >

                                    <div className="flex items-center gap-4">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 rounded-xl object-cover bg-gray-100"
                                        />

                                        <div>

                                            <h4 className="font-bold dark:text-white">
                                                {product.name}
                                            </h4>

                                            <p className="text-sm text-gray-500">
                                                ₹{product.price}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                By:{" "}
                                                {product.createdBy?.name ||
                                                    "Salesperson"}
                                            </p>

                                        </div>

                                    </div>


                                    <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                        Pending
                                    </span>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
};

export default AdminDashboard;