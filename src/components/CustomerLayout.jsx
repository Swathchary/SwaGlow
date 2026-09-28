import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
    Home,
    Package,
    ShoppingCart,
    User,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
} from "lucide-react";

import { useTheme } from "../context/ThemeContext";
import Navbar from './Navbar'

function CustomerLayout() {
    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { darkMode, toggleTheme } = useTheme();

    const handleLogout = () => {
            localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">

            {/* ================= NAVBAR ================= */}
               
               <Navbar/>


            {/* ================= PAGE CONTENT ================= */}

            <main className="min-h-[calc(100vh-64px)]">

                <Outlet />

            </main>


            {/* ================= FOOTER ================= */}

            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                    <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                        © {new Date().getFullYear()} SwaGlow. All rights reserved.
                    </p>

                </div>

            </footer>

        </div>
    );
}

export default CustomerLayout;