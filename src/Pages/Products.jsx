import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";
const Products = () => {

    const { addToCart } = useContext(CartContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Fetch products
    const getProducts = async () => {
        try {
            setLoading(true);

            const response = await fetch("https://fakestoreapi.com/products");
            const data = await response.json();

            setProducts(data);
        } catch (error) {
            console.log("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // Add to cart
    // const handleAddToCart = (product) => {
    //     setCart((prev) => [...prev, product]);


    // };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header */}
            <div className="text-center py-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <h1 className="text-4xl font-bold">Our Products</h1>
                <p className="mt-2">Find the best products at best prices</p>
                {/* <p className="mt-2 font-semibold">Cart Items: {cart.length}</p> */}
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-10">

                {loading ? (
                    <h2 className="text-center text-xl font-semibold">
                        Loading products...
                    </h2>
                ) : (
                    <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                        {products.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => navigate(`/product/${item.id}`)}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
                            >
                                {/* Image */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-48 w-full object-contain p-2"
                                />

                                {/* Title */}
                                <h3 className="font-semibold text-sm mt-2 h-12 overflow-hidden">
                                    {item.title}
                                </h3>

                                {/* Rating */}
                                <p className="text-yellow-500 mt-1">
                                    ⭐ {item.rating.rate}
                                </p>

                                {/* Price */}
                                <p className="text-green-600 font-bold text-lg mt-1">
                                    ${item.price}
                                </p>

                                {/* Button */}
                                <button
                                    onClick={() => addToCart(item)}
                                    className="w-full mt-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}

                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;