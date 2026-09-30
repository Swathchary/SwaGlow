import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "https://glow-mchc.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            window.dispatchEvent(
                new Event("userChanged")
            );

            if (data.user.role === "admin") {
                navigate("/admin", { replace: true });
            } else if (data.user.role === "salesperson") {
                navigate("/sales", { replace: true });
            } else if (data.user.role === "customer") {
                navigate("/customer", { replace: true });
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

            <div className="w-full max-w-md sm:max-w-lg">

                {/* LOGIN CARD */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* HEADER */}
                    <div className="px-6 py-8 sm:px-10 sm:py-10 text-center bg-gradient-to-r from-pink-500 to-purple-600">

                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            SwaGlow
                        </h1>

                        <p className="mt-2 text-sm sm:text-base text-pink-100">
                            Welcome back
                        </p>

                    </div>

                    {/* FORM */}
                    <div className="px-6 py-8 sm:px-10 sm:py-10">

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                            Login
                        </h2>

                        <p className="mt-2 text-center text-sm sm:text-base text-gray-500">
                            Sign in to continue to your account
                        </p>

                        {/* ERROR */}
                        {error && (
                            <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* EMAIL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                                />
                            </div>

                            {/* PASSWORD */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required

                                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                                />
                            </div>

                            {/* LOGIN BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base sm:text-lg hover:from-pink-600 hover:to-purple-700 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                        </form>

                        {/* REGISTER */}
                        <p className="mt-8 text-center text-sm sm:text-base text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-pink-600 hover:text-pink-700"
                            >
                                Register
                            </Link>
                        </p>

                    </div>
                </div>

                {/* FOOTER TEXT */}
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
                    © {new Date().getFullYear()} SwaGlow. All rights reserved.
                </p>

            </div>
        </div>
    );
}

export default Login;