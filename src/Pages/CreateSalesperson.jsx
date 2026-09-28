import { useState } from "react";
import {
    UserPlus,
    User,
    Mail,
    Lock,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import AdminNavbar from "../components/AdminNavbar";

const API_URL = "http://localhost:5000/api";

const CreateSalesperson = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");
        setLoading(true);


        try {

            const token = localStorage.getItem("token");


            const response = await fetch(
                `${API_URL}/auth/create-salesperson`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(formData),
                }
            );


            const data = await response.json();


            if (!response.ok || !data.status) {

                setError(
                    data.message ||
                    "Failed to create salesperson"
                );

                return;
            }


            setMessage(
                "Salesperson account created successfully!"
            );


            setFormData({
                name: "",
                email: "",
                password: "",
            });


        } catch (error) {

            console.error(
                "CREATE SALESPERSON ERROR:",
                error
            );

            setError(
                "Unable to connect to the server"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <AdminNavbar />


            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">


                {/* HEADER */}

                <div className="text-center mb-8">

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">

                        <UserPlus
                            size={30}
                            className="text-white"
                        />

                    </div>


                    <h2 className="text-3xl font-black mt-5 text-gray-900 dark:text-white">
                        Create Salesperson Account
                    </h2>

                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        Create an account for a salesperson to manage products.
                    </p>

                </div>


                {/* FORM */}

                <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-6 sm:p-8">


                    {/* SUCCESS */}

                    {message && (

                        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400">

                            <CheckCircle size={20} />

                            <span>
                                {message}
                            </span>

                        </div>

                    )}


                    {/* ERROR */}

                    {error && (

                        <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400">

                            <AlertCircle size={20} />

                            <span>
                                {error}
                            </span>

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >


                        {/* NAME */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Full Name
                            </label>

                            <div className="relative">

                                <User
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter salesperson name"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                        </div>


                        {/* EMAIL */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Email
                            </label>

                            <div className="relative">

                                <Mail
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="salesperson@example.com"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                        </div>


                        {/* PASSWORD */}

                        <div>

                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
                                Password
                            </label>

                            <div className="relative">

                                <Lock
                                    size={19}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    minLength={6}
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                                />

                            </div>

                            <p className="text-xs text-gray-500 mt-2">
                                Password must contain at least 6 characters.
                            </p>

                        </div>


                        {/* INFO */}

                        <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-900/20">

                            <p className="text-sm text-purple-700 dark:text-purple-300">
                                This account will automatically receive the{" "}
                                <strong>salesperson</strong> role.
                            </p>

                        </div>


                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold hover:opacity-90 transition disabled:opacity-50"
                        >

                            {loading
                                ? "Creating Account..."
                                : "Create Salesperson Account"}

                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
};

export default CreateSalesperson;