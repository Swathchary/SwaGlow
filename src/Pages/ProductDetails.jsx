import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import { useCart } from "../context/CartContext";

const API_URL =
    "http://localhost:5000/api/products";

const ProductDetails = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const { addToCart } = useCart();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);


    const getProduct = async () => {
        try {
            setLoading(true);

            const token =
                localStorage.getItem("token");

            const response = await fetch(
                `${API_URL}/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data =
                await response.json();

            if (data.status) {
                setProduct(
                    data.product
                );
            }

        } catch (error) {
            console.error(
                "Product details error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        getProduct();
    }, [id]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">

                <p className="text-xl font-semibold text-pink-600">
                    Loading product...
                </p>

            </div>
        );
    }


    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-950">

                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Product not found
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/customer/products"
                        )
                    }
                    className="mt-5 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg"
                >
                    Back to Products
                </button>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-10">

            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                <button
                    onClick={() =>
                        navigate(-1)
                    }
                    className="mb-8 text-pink-600 font-semibold"
                >
                    ← Back
                </button>


                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* IMAGE */}

                    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl p-8">

                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-96 w-full object-contain"
                        />

                    </div>


                    {/* DETAILS */}

                    <div>

                        <p className="text-sm uppercase font-semibold text-pink-600">
                            {product.category}
                        </p>


                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mt-3">
                            {product.name}
                        </h1>


                        <p className="text-3xl font-bold text-pink-600 mt-6">
                            ₹{product.price}
                        </p>


                        <p className="text-gray-600 dark:text-gray-300 mt-6 leading-7">
                            {product.description}
                        </p>


                        <p className="mt-5 text-gray-600 dark:text-gray-300">
                            Available stock:{" "}
                            <strong>
                                {product.stock}
                            </strong>
                        </p>


                        <button
                            disabled={
                                product.stock <=
                                0
                            }
                            onClick={() =>
                                addToCart(
                                    product
                                )
                            }
                            className={`w-full mt-8 py-3 rounded-xl font-semibold text-white ${
                                product.stock <=
                                0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                            }`}
                        >
                            {product.stock <= 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                        </button>


                        <button
                            onClick={() =>
                                navigate(
                                    "/customer/cart"
                                )
                            }
                            className="w-full mt-3 border border-pink-500 text-pink-600 py-3 rounded-xl font-semibold"
                        >
                            View Cart
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;