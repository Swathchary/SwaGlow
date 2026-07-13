import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../CartContext";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `https://fakestoreapi.com/products/${id}`
                );
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                >
                    ← Back
                </button>

                <div className="grid md:grid-cols-2 gap-10">

                    <div className="flex justify-center">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="h-96 object-contain"
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold">
                            {product.title}
                        </h1>

                        <p className="text-gray-500 mt-2 capitalize">
                            {product.category}
                        </p>

                        <p className="text-yellow-500 text-lg mt-4">
                            ⭐ {product.rating.rate} ({product.rating.count} Reviews)
                        </p>

                        <h2 className="text-4xl font-bold text-green-600 mt-4">
                            ${product.price}
                        </h2>

                        <p className="text-gray-700 mt-6 leading-7">
                            {product.description}
                        </p>

                        <button
                            onClick={() => addToCart(product)}
                            className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-600"
                        >
                            Add to Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;