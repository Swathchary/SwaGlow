import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        password: formData.password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            alert("Registration successful! Please login.");

            navigate("/login");

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

            <div className="w-full max-w-md sm:max-w-lg">

                {/* ================= CARD ================= */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

                    {/* ================= HEADER ================= */}
                    <div className="px-6 py-8 sm:px-10 sm:py-10 text-center bg-gradient-to-r from-pink-500 to-purple-600">

                        <h1 className="text-3xl sm:text-4xl font-bold text-white">
                            SwaGlow
                        </h1>

                        <p className="mt-2 text-sm sm:text-base text-pink-100">
                            Create your account
                        </p>

                    </div>

                    {/* ================= FORM AREA ================= */}
                    <div className="px-6 py-8 sm:px-10 sm:py-10">

                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
                            Register
                        </h2>

                        <p className="mt-2 text-center text-sm sm:text-base text-gray-500">
                            Create an account to get started
                        </p>

                        {/* ERROR MESSAGE */}
                        {error && (
                            <div className="mt-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="mt-8 space-y-5"
                        >

                            {/* NAME */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                                />
                            </div>

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
                                    placeholder="Create a password"
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                                />
                            </div>

                            {/* CONFIRM PASSWORD */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    required
                                    className="w-full px-4 py-3 sm:py-3.5 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition"
                                />
                            </div>

                            {/* REGISTER BUTTON */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-base sm:text-lg hover:from-pink-600 hover:to-purple-700 transition duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading
                                    ? "Creating Account..."
                                    : "Create Account"}
                            </button>

                        </form>

                        {/* LOGIN LINK */}
                        <p className="mt-8 text-center text-sm sm:text-base text-gray-600">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-pink-600 hover:text-pink-700"
                            >
                                Login
                            </Link>

                        </p>

                    </div>
                </div>

                {/* FOOTER */}
                <p className="text-center text-xs sm:text-sm text-gray-500 mt-6">
                    © {new Date().getFullYear()} SwaGlow. All rights reserved.
                </p>

            </div>

        </div>
    );
}

export default Register;