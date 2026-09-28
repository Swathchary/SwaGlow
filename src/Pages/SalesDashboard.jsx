import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    ShoppingCart,
    BarChart3,
    LogOut,
    Clock3,
    CheckCircle2,
    XCircle,
    RefreshCw,
    User,
    ArrowRight,
} from "lucide-react";

const API_URL = "http://localhost:5000/api";

const SalesDashboard = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (!token || !savedUser) {
            navigate("/login", { replace: true });
            return;
        }

        try {
            const parsedUser = JSON.parse(savedUser);

            if (parsedUser.role !== "salesperson") {
                navigate("/login", { replace: true });
                return;
            }

            setUser(parsedUser);
            fetchMyProducts(token);
        } catch (error) {
            console.error("USER ERROR:", error);
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    const fetchMyProducts = async (token) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/products/my-products`,
                {
                    method: "GET",
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
        } catch (error) {
            console.error("PRODUCT FETCH ERROR:", error);
            setError(error.message || "Unable to load products");
        } finally {
            setLoading(false);
        }
    };

    const refreshProducts = () => {
        const token = localStorage.getItem("token");

        if (token) {
            fetchMyProducts(token);
        }
    };

    const logout = () => {
            localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    };

    const totalProducts = products.length;

    const pendingProducts = products.filter(
        (product) => product.status === "pending"
    ).length;

    const approvedProducts = products.filter(
        (product) => product.status === "approved"
    ).length;

    const rejectedProducts = products.filter(
        (product) => product.status === "rejected"
    ).length;

    const recentProducts = products.slice(0, 5);

    const statusBadge = (status) => {
        if (status === "approved") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle2 size={13} />
                    Approved
                </span>
            );
        }

        if (status === "rejected") {
            return (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                    <XCircle size={13} />
                    Rejected
                </span>
            );
        }

        return (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                <Clock3 size={13} />
                Pending
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

            {/* ================= HEADER ================= */}
            <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">

                        {/* LOGO */}
                        <button
                            type="button"
                            onClick={() => navigate("/sales")}
                            className="text-left"
                        >
                            <h1 className="text-3xl font-black tracking-tight">
                                <span className="text-pink-500">
                                    Swa
                                </span>
                                <span className="text-purple-600">
                                    Glow
                                </span>
                            </h1>

                            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                Salesperson Panel
                            </p>
                        </button>

                        {/* RIGHT SIDE */}
                        <div className="flex items-center gap-4">

                            <div className="hidden sm:flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-md">
                                    <User
                                        size={20}
                                        className="text-white"
                                    />
                                </div>

                                <div className="text-left">
                                    <p className="text-sm font-bold">
                                        {user?.name || "Salesperson"}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Salesperson
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                            >
                                <LogOut size={18} />

                                <span className="hidden sm:block font-medium">
                                    Logout
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ================= MAIN ================= */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* WELCOME SECTION */}
                <section className="mb-8">
                    <div className="rounded-3xl bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 p-7 sm:p-9 text-white shadow-xl">

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                            <div>
                                <p className="text-sm font-semibold text-white/80 mb-2">
                                    SALESPERSON DASHBOARD
                                </p>

                                <h2 className="text-3xl sm:text-4xl font-black">
                                    Welcome, {user?.name || "Salesperson"} 👋
                                </h2>

                                <p className="mt-3 text-white/80 max-w-2xl">
                                    Manage your products, submit new products
                                    and track their approval status.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/sales/add-product")
                                }
                                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-bold hover:bg-gray-100 transition shadow-lg"
                            >
                                <PlusCircle size={19} />
                                Add Product
                            </button>

                        </div>
                    </div>
                </section>

                {/* ERROR */}
                {error && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                        <p className="font-medium">{error}</p>
                    </div>
                )}

                {/* ================= STAT CARDS ================= */}
                <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

                    {/* TOTAL */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Total Products
                                </p>

                                <h3 className="mt-2 text-3xl font-black">
                                    {loading ? "—" : totalProducts}
                                </h3>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                <Package
                                    size={24}
                                    className="text-purple-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* PENDING */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Pending
                                </p>

                                <h3 className="mt-2 text-3xl font-black">
                                    {loading ? "—" : pendingProducts}
                                </h3>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                <Clock3
                                    size={24}
                                    className="text-yellow-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* APPROVED */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Approved
                                </p>

                                <h3 className="mt-2 text-3xl font-black">
                                    {loading ? "—" : approvedProducts}
                                </h3>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                <CheckCircle2
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* REJECTED */}
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                    Rejected
                                </p>

                                <h3 className="mt-2 text-3xl font-black">
                                    {loading ? "—" : rejectedProducts}
                                </h3>
                            </div>

                            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <XCircle
                                    size={24}
                                    className="text-red-600"
                                />
                            </div>
                        </div>
                    </div>

                </section>

                {/* ================= QUICK ACTIONS ================= */}
                <section className="mb-8">

                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-2xl font-black">
                                Quick Actions
                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Manage your salesperson activities
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        {/* ADD PRODUCT */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/sales/add-product")
                            }
                            className="group text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center mb-4">
                                <PlusCircle
                                    size={24}
                                    className="text-white"
                                />
                            </div>

                            <h3 className="font-bold text-lg">
                                Add New Product
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Submit a new product for admin approval.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:gap-3 transition-all">
                                Add Product
                                <ArrowRight size={16} />
                            </span>
                        </button>

                        {/* MY PRODUCTS */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate("/sales/products")
                            }
                            className="group text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                                <Package
                                    size={24}
                                    className="text-purple-600"
                                />
                            </div>

                            <h3 className="font-bold text-lg">
                                My Products
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                View all products submitted by you.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-600 group-hover:gap-3 transition-all">
                                View Products
                                <ArrowRight size={16} />
                            </span>
                        </button>

                        {/* REFRESH */}
                        <button
                            type="button"
                            onClick={refreshProducts}
                            className="group text-left bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
                        >
                            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                                <RefreshCw
                                    size={24}
                                    className="text-blue-600"
                                />
                            </div>

                            <h3 className="font-bold text-lg">
                                Refresh Products
                            </h3>

                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Get the latest product approval status.
                            </p>

                            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all">
                                Refresh
                                <ArrowRight size={16} />
                            </span>
                        </button>

                    </div>
                </section>

                {/* ================= RECENT PRODUCTS ================= */}
                <section>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                        <div>
                            <h2 className="text-2xl font-black">
                                Recent Products
                            </h2>

                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Your latest submitted products
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/sales/products")
                            }
                            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-pink-500 transition"
                        >
                            View All
                            <ArrowRight size={16} />
                        </button>

                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">

                        {loading ? (
                            <div className="p-10 text-center">
                                <div className="inline-flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                    <RefreshCw
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Loading products...
                                </div>
                            </div>
                        ) : recentProducts.length === 0 ? (
                            <div className="p-10 text-center">

                                <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Package
                                        size={30}
                                        className="text-purple-600"
                                    />
                                </div>

                                <h3 className="mt-4 text-lg font-bold">
                                    No products yet
                                </h3>

                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    Add your first product to get started.
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate("/sales/add-product")
                                    }
                                    className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold hover:shadow-lg transition"
                                >
                                    <PlusCircle size={18} />
                                    Add Product
                                </button>

                            </div>
                        ) : (
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[700px]">

                                    <thead>
                                        <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950/50">

                                            <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Product
                                            </th>

                                            <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Category
                                            </th>

                                            <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Price
                                            </th>

                                            <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Stock
                                            </th>

                                            <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                Status
                                            </th>

                                        </tr>
                                    </thead>

                                    <tbody>
                                        {recentProducts.map((product) => (
                                            <tr
                                                key={product._id}
                                                className="border-b last:border-b-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition"
                                            >

                                                {/* PRODUCT */}
                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">

                                                            {product.image ? (
                                                                <img
                                                                    src={product.image}
                                                                    alt={product.name}
                                                                    className="w-full h-full object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.style.display =
                                                                            "none";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Package
                                                                    size={20}
                                                                    className="m-3 text-gray-400"
                                                                />
                                                            )}

                                                        </div>

                                                        <div>
                                                            <p className="font-bold">
                                                                {product.name}
                                                            </p>

                                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                ID:{" "}
                                                                {product._id?.slice(
                                                                    -6
                                                                )}
                                                            </p>
                                                        </div>

                                                    </div>

                                                </td>

                                                {/* CATEGORY */}
                                                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                                    {product.category}
                                                </td>

                                                {/* PRICE */}
                                                <td className="px-6 py-4 font-semibold">
                                                    ₹{product.price}
                                                </td>

                                                {/* STOCK */}
                                                <td className="px-6 py-4 text-sm">
                                                    {product.stock}
                                                </td>

                                                {/* STATUS */}
                                                <td className="px-6 py-4">
                                                    {statusBadge(
                                                        product.status
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                            </div>
                        )}

                    </div>
                </section>

            </main>
        </div>
    );
};

export default SalesDashboard;