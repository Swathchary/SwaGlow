import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    PlusCircle,
    LogOut,
    Moon,
    Sun,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";

const SalesNavbar = () => {
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("userChanged"));

    navigate("/login", { replace: true });
};

const linkStyle = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-xl transition ${
            isActive
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
        }`;

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">

                <NavLink to="/sales">
                    <h1 className="text-2xl font-black">
                        <span className="text-pink-500">Swa</span>
                        <span className="text-purple-600">Glow</span>
                    </h1>
                    <p className="text-xs text-gray-500">
                        Salesperson Panel
                    </p>
                </NavLink>

                <div className="flex flex-wrap items-center gap-2">

                    <NavLink
                        to="/sales"
                        end
                        className={linkStyle}
                    >
                        <LayoutDashboard size={19} />
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/sales/products"
                        className={linkStyle}
                    >
                        <Package size={19} />
                        My Products
                    </NavLink>

                    <NavLink
                        to="/sales/add-product"
                        className={linkStyle}
                    >
                        <PlusCircle size={19} />
                        Add Product
                    </NavLink>

                    <button
                        onClick={toggleTheme}
                        className="p-2 text-purple-600"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun /> : <Moon />}
                    </button>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 p-2 text-red-500"
                    >
                        <LogOut size={19} />
                        Logout
                    </button>

                </div>
            </nav>
        </header>
    );
};

export default SalesNavbar;