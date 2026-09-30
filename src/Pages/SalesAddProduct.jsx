import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackagePlus, ImagePlus } from "lucide-react";
import SalesNavbar from "../components/SalesNavbar";
import categories from "../constants/categories";

const SalesAddProduct = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        image: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login", { replace: true });
                return;
            }

            const response = await fetch(
                "https://glow-mchc.onrender.com/api/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        name: form.name.trim(),
                        description: form.description.trim(),
                        price: Number(form.price),
                        category: form.category.trim(),
                        stock: Number(form.stock),
                        image: form.image.trim(),
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.status) {
                throw new Error(
                    data.message || "Failed to add product"
                );
            }

            setSuccess(
                "Product submitted successfully! Waiting for admin approval."
            );

            setForm({
                name: "",
                description: "",
                price: "",
                category: "",
                stock: "",
                image: "",
            });

        } catch (err) {
            console.error("ADD PRODUCT ERROR:", err);

            setError(
                err.message || "Failed to add product"
            );
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "w-full px-4 py-3 rounded-xl border border-gray-300 " +
        "dark:border-gray-700 bg-white dark:bg-gray-800 " +
        "text-gray-900 dark:text-white outline-none " +
        "focus:ring-2 focus:ring-purple-500";

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">

            <SalesNavbar />

            <main className="max-w-3xl mx-auto px-4 py-10">

                {/* =========================
                    PAGE HEADER
                ========================== */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <PackagePlus
                            size={32}
                            className="text-purple-600"
                        />

                        <h1 className="text-3xl font-black dark:text-white">
                            Add New Product
                        </h1>

                    </div>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Submit a product for admin approval.
                    </p>

                </div>

                {/* =========================
                    FORM
                ========================== */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        bg-white
                        dark:bg-gray-900
                        border
                        border-gray-200
                        dark:border-gray-800
                        rounded-2xl
                        p-6
                        sm:p-8
                        space-y-5
                    "
                >

                    {/* ERROR */}

                    {error && (
                        <div className="
                            bg-red-50
                            dark:bg-red-900/20
                            border
                            border-red-200
                            dark:border-red-800
                            text-red-700
                            dark:text-red-400
                            p-4
                            rounded-xl
                        ">
                            {error}
                        </div>
                    )}

                    {/* SUCCESS */}

                    {success && (
                        <div className="
                            bg-green-50
                            dark:bg-green-900/20
                            border
                            border-green-200
                            dark:border-green-800
                            text-green-700
                            dark:text-green-400
                            p-4
                            rounded-xl
                        ">
                            {success}
                        </div>
                    )}

                    {/* =========================
                        PRODUCT NAME
                    ========================== */}

                    <div>

                        <label className="
                            block
                            mb-2
                            font-semibold
                            dark:text-white
                        ">
                            Product Name
                        </label>

                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter product name"
                            className={inputClass}
                        />

                    </div>

                    {/* =========================
                        DESCRIPTION
                    ========================== */}

                    <div>

                        <label className="
                            block
                            mb-2
                            font-semibold
                            dark:text-white
                        ">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Describe your product"
                            className={inputClass}
                        />

                    </div>

                    {/* =========================
                        PRICE + STOCK
                    ========================== */}

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        gap-5
                    ">

                        <div>

                            <label className="
                                block
                                mb-2
                                font-semibold
                                dark:text-white
                            ">
                                Price (₹)
                            </label>

                            <input
                                name="price"
                                type="number"
                                min="0"
                                step="0.01"
                                value={form.price}
                                onChange={handleChange}
                                required
                                placeholder="Enter price"
                                className={inputClass}
                            />

                        </div>

                        <div>

                            <label className="
                                block
                                mb-2
                                font-semibold
                                dark:text-white
                            ">
                                Stock
                            </label>

                            <input
                                name="stock"
                                type="number"
                                min="0"
                                step="1"
                                value={form.stock}
                                onChange={handleChange}
                                required
                                placeholder="Enter stock"
                                className={inputClass}
                            />

                        </div>

                    </div>

                    {/* =========================
                        CATEGORY
                    ========================== */}

                    <div>

                        <label className="
                            block
                            mb-2
                            font-semibold
                            dark:text-white
                        ">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            className={inputClass}
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((category) => (
                                <option
                                    key={category}
                                    value={category}
                                >
                                    {category}
                                </option>
                            ))}

                        </select>

                        <p className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            mt-2
                        ">
                            Select one category for this product.
                        </p>

                    </div>

                    {/* =========================
                        IMAGE
                    ========================== */}

                    <div>

                        <label className="
                            flex
                            items-center
                            gap-2
                            mb-2
                            font-semibold
                            dark:text-white
                        ">
                            <ImagePlus size={20} />
                            Product Image URL
                        </label>

                        <input
                            name="image"
                            type="url"
                            value={form.image}
                            onChange={handleChange}
                            required
                            placeholder="https://example.com/product.jpg"
                            className={inputClass}
                        />

                        <p className="
                            text-sm
                            text-gray-500
                            dark:text-gray-400
                            mt-2
                        ">
                            Enter a publicly accessible image URL.
                        </p>

                        {form.image && (
                            <img
                                src={form.image}
                                alt="Product preview"
                                className="
                                    w-40
                                    h-40
                                    mt-4
                                    object-cover
                                    rounded-xl
                                    border
                                    border-gray-200
                                    dark:border-gray-700
                                "
                            />
                        )}

                    </div>

                    {/* =========================
                        APPROVAL INFO
                    ========================== */}

                    <div className="
                        bg-purple-50
                        dark:bg-purple-900/20
                        p-4
                        rounded-xl
                        text-sm
                        text-purple-700
                        dark:text-purple-300
                    ">
                        Your product will be pending until an
                        administrator approves it.
                    </div>

                    {/* =========================
                        BUTTONS
                    ========================== */}

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    ">

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                flex-1
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-pink-500
                                to-purple-600
                                text-white
                                font-bold
                                hover:from-purple-600
                                hover:to-pink-500
                                transition
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {loading
                                ? "Submitting..."
                                : "Submit Product for Approval"}
                        </button>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/sales/products")
                            }
                            className="
                                px-6
                                py-3
                                border
                                border-gray-300
                                dark:border-gray-700
                                rounded-xl
                                dark:text-white
                                hover:bg-gray-50
                                dark:hover:bg-gray-800
                                transition
                            "
                        >
                            My Products
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
};

export default SalesAddProduct;