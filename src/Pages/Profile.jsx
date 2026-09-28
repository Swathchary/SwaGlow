import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    User,
    Mail,
    ShieldCheck,
    ShoppingBag,
    LogOut,
    Edit3,
    Save,
    X,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const Profile = () => {
    const navigate = useNavigate();
    const { cartCount } = useCart();

    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem("user");

            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);

                setUser(parsedUser);
                setName(parsedUser.name || "");
                setEmail(parsedUser.email || "");
            }
        } catch (error) {
            console.error("Profile loading error:", error);
        }
    }, []);

    // ================================
    // SAVE PROFILE
    // ================================

    const handleSave = () => {
        const updatedUser = {
            ...user,
            name,
            email,
        };

        localStorage.setItem(
            "user",
            JSON.stringify(updatedUser)
        );

        setUser(updatedUser);
        setIsEditing(false);
    };

    // ================================
    // CANCEL EDIT
    // ================================

    const handleCancel = () => {
        setName(user?.name || "");
        setEmail(user?.email || "");
        setIsEditing(false);
    };

    // ================================
    // LOGOUT
    // ================================

    const handleLogout = () => {
           localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";

    };

    // ================================
    // NO USER
    // ================================

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">

                <div className="text-center">

                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white">
                        <User size={40} />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mt-5">
                        Please Login
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        You need to login to view your profile.
                    </p>

                    <button
                        onClick={() => navigate("/login")}
                        className="mt-6 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                    >
                        Go to Login
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 sm:py-12">

            <div className="max-w-5xl mx-auto px-4 sm:px-6">

                {/* =====================================
                    PAGE TITLE
                ====================================== */}

                <div className="mb-8">

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
                        My Profile
                    </h1>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Manage your SwaGlow account information
                    </p>

                </div>


                {/* =====================================
                    PROFILE CARD
                ====================================== */}

                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">

                    {/* PROFILE HEADER */}

                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 px-6 sm:px-8 py-8">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                            {/* AVATAR */}

                            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">

                                <span className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                    {user.name
                                        ? user.name
                                              .charAt(0)
                                              .toUpperCase()
                                        : "U"}
                                </span>

                            </div>


                            {/* USER NAME */}

                            <div className="text-white">

                                <h2 className="text-2xl sm:text-3xl font-bold">
                                    {user.name}
                                </h2>

                                <p className="text-pink-100 mt-1">
                                    {user.email}
                                </p>

                                <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-white/20 rounded-full text-sm">
                                    <ShieldCheck size={16} />

                                    <span className="capitalize">
                                        {user.role || "Customer"}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* PROFILE BODY */}

                    <div className="p-6 sm:p-8">

                        {/* =================================
                            ACCOUNT INFORMATION
                        ================================== */}

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                                    Account Information
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Your registered account details
                                </p>

                            </div>


                            {!isEditing && (
                                <button
                                    onClick={() =>
                                        setIsEditing(true)
                                    }
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-pink-600 border border-pink-200 dark:border-pink-900 hover:bg-pink-50 dark:hover:bg-gray-800"
                                >
                                    <Edit3 size={17} />

                                    <span className="hidden sm:inline">
                                        Edit
                                    </span>
                                </button>
                            )}

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* NAME */}

                            <div>

                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                    Full Name
                                </label>

                                <div className="relative">

                                    <User
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="text"
                                        value={name}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setName(
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            pl-10
                                            pr-4
                                            py-3
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-gray-50
                                            dark:bg-gray-800
                                            text-gray-800
                                            dark:text-white
                                            outline-none
                                            focus:ring-2
                                            focus:ring-pink-500
                                            disabled:opacity-70
                                        "
                                    />

                                </div>

                            </div>


                            {/* EMAIL */}

                            <div>

                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                                    Email Address
                                </label>

                                <div className="relative">

                                    <Mail
                                        size={19}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />

                                    <input
                                        type="email"
                                        value={email}
                                        disabled={!isEditing}
                                        onChange={(e) =>
                                            setEmail(
                                                e.target.value
                                            )
                                        }
                                        className="
                                            w-full
                                            pl-10
                                            pr-4
                                            py-3
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-gray-50
                                            dark:bg-gray-800
                                            text-gray-800
                                            dark:text-white
                                            outline-none
                                            focus:ring-2
                                            focus:ring-pink-500
                                            disabled:opacity-70
                                        "
                                    />

                                </div>

                            </div>

                        </div>


                        {/* EDIT BUTTONS */}

                        {isEditing && (

                            <div className="flex flex-col sm:flex-row gap-3 mt-6">

                                <button
                                    onClick={handleSave}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                                >
                                    <Save size={18} />

                                    Save Changes
                                </button>


                                <button
                                    onClick={handleCancel}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200"
                                >
                                    <X size={18} />

                                    Cancel
                                </button>

                            </div>

                        )}

                    </div>

                </div>


                {/* =====================================
                    QUICK ACTIONS
                ====================================== */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

                    {/* CART */}

                    <button
                        onClick={() =>
                            navigate("/customer/cart")
                        }
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition text-left"
                    >

                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4">

                                <div className="w-12 h-12 rounded-xl bg-pink-100 dark:bg-pink-900/30 text-pink-600 flex items-center justify-center">
                                    <ShoppingBag size={24} />
                                </div>

                                <div>

                                    <h3 className="font-bold text-gray-800 dark:text-white">
                                        My Cart
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {cartCount} item
                                        {cartCount !== 1
                                            ? "s"
                                            : ""}
                                    </p>

                                </div>

                            </div>

                            <span className="text-pink-500 text-xl">
                                →
                            </span>

                        </div>

                    </button>


                    {/* LOGOUT */}

                    <button
                        onClick={handleLogout}
                        className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-lg transition text-left"
                    >

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center">
                                <LogOut size={24} />
                            </div>

                            <div>

                                <h3 className="font-bold text-gray-800 dark:text-white">
                                    Logout
                                </h3>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Sign out of your account
                                </p>

                            </div>

                        </div>

                    </button>

                </div>

            </div>

        </div>
    );
};

export default Profile;