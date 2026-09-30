import { NavLink } from "react-router-dom";
import {
    Home,
    Package,
    ShoppingCart,
    User,
    Moon,
    Sun,
    LogOut,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { darkMode, toggleTheme } = useTheme();

    const { cartItems } = useCart();

    const cartCount = cartItems.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
    );


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/login";

    };

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* ================= LOGO ================= */}
                    <NavLink to="/home">
                        <h1 className="text-3xl font-black tracking-tight">
                            <span className="text-pink-500">
                                Swa
                            </span>
                            <span className="text-purple-600">
                                Glow
                            </span>
                        </h1>
                    </NavLink>


                    {/* ================= NAVIGATION ================= */}
                    <div className="flex items-center gap-6">

                        {/* HOME */}
                        <NavLink
                            to="/home"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition ${isActive
                                    ? "text-pink-600"
                                    : "text-gray-700 dark:text-gray-200 hover:text-pink-500"
                                }`
                            }
                        >
                            <Home size={22} />

                            <span className="hidden sm:block">
                                Home
                            </span>
                        </NavLink>


                        {/* PRODUCTS */}
                        <NavLink
                            to="/customer/products"
                            className={({ isActive }) =>
                                `flex items-center gap-2 transition ${isActive
                                    ? "text-pink-600"
                                    : "text-gray-700 dark:text-gray-200 hover:text-pink-500"
                                }`
                            }
                        >
                            <Package size={22} />

                            <span className="hidden sm:block">
                                Products
                            </span>
                        </NavLink>


                        {/* ================= CART ================= */}
                        <NavLink
                            to="/customer/cart"
                            className={({ isActive }) =>
                                `relative flex items-center gap-2 px-4 py-2 rounded-xl transition ${isActive
                                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                    : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                                }`
                            }
                        >
                            <ShoppingCart size={20} />

                            <span>Cart</span>

                            {cartCount > 0 && (
                                <span
                                    className="
                absolute
                -top-2
                -right-2
                min-w-[22px]
                h-[22px]
                px-1.5
                rounded-full
                bg-red-500
                text-white
                text-xs
                font-bold
                flex
                items-center
                justify-center
                border-2
                border-white
                dark:border-gray-900
            "
                                >
                                    {cartCount}
                                </span>
                            )}
                        </NavLink>


                        {/* ================= PROFILE ================= */}

                        <NavLink
                            to="/customer/profile"
                            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 hover:text-purple-600 dark:hover:text-purple-400 transition"
                        >
                            <User
                                size={20}
                                className="text-gray-600 dark:text-gray-300"
                            />

                            <span>Profile</span>
                        </NavLink>
                        {/* ================= THEME ================= */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="text-purple-600 hover:text-pink-500 transition"
                            title="Toggle theme"
                        >
                            {darkMode ? (
                                <Sun size={23} />
                            ) : (
                                <Moon size={23} />
                            )}
                        </button>


                        {/* ================= LOGOUT ================= */}
                        <button
                            type="button"
                            onClick={logout}
                            className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
                        >
                            <LogOut size={22} />

                            <span className="hidden sm:block">
                                Logout
                            </span>
                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;