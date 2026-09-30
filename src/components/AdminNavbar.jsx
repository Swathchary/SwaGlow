import { NavLink, useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    UserPlus,
    LogOut,
    User,
    Moon,
    Sun,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const AdminNavbar = () => {
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useTheme();

    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("userChanged"));

    navigate("/login", { replace: true });
};
    const navClass = ({ isActive }) =>
        `flex items-center gap-2 px-3 py-2 rounded-lg transition ${
            isActive
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                : "text-gray-700 dark:text-gray-200 hover:bg-pink-50 dark:hover:bg-gray-800"
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="min-h-16 flex flex-wrap items-center justify-between gap-3 py-2">

                    {/* LOGO */}

                    <NavLink to="/admin">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">
                                <span className="text-pink-500">Swa</span>
                                <span className="text-purple-600">Glow</span>
                            </h1>

                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Admin Panel
                            </p>
                        </div>
                    </NavLink>


                    {/* NAVIGATION */}

                    <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">

                        <NavLink
                            to="/admin"
                            end
                            className={navClass}
                        >
                            <LayoutDashboard size={19} />
                            <span className="hidden sm:block">
                                Dashboard
                            </span>
                        </NavLink>


                        <NavLink
                            to="/admin/products"
                            className={navClass}
                        >
                            <Package size={19} />
                            <span className="hidden sm:block">
                                Products
                            </span>
                        </NavLink>


                        <NavLink
                            to="/admin/create-salesperson"
                            className={navClass}
                        >
                            <UserPlus size={19} />
                            <span className="hidden sm:block">
                                Salesperson
                            </span>
                        </NavLink>


                        {/* USER */}

                        <div className="hidden lg:flex items-center gap-2 px-3 text-gray-700 dark:text-gray-200">

                            <User size={19} />

                            <span className="text-sm font-medium">
                                {user?.name || "Admin"}
                            </span>

                        </div>


                        {/* THEME */}

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="p-2 text-purple-600 hover:text-pink-500 transition"
                            title="Toggle theme"
                        >
                            {darkMode ? (
                                <Sun size={21} />
                            ) : (
                                <Moon size={21} />
                            )}
                        </button>


                        {/* LOGOUT */}

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 py-2 text-red-500 hover:text-red-600 transition"
                        >
                            <LogOut size={19} />

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

export default AdminNavbar;