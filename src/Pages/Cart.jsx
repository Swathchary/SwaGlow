import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {

    const navigate = useNavigate();


    const handleCheckout = () => {
    navigate("/checkout");
};


    const {
        cart,
        removeFromCart,
        increaseQty,
        decreaseQty,
    } = useContext(CartContext);

    // Safe total calculation
    const total = cart?.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-3xl font-bold text-center mb-10">
                Your Cart 🛒
            </h1>

            {/* EMPTY CART UI */}
            {cart.length === 0 ? (
                <div className="text-center mt-20">
                    <h2 className="text-2xl text-gray-500 mb-4">
                        🛒 Your cart is empty
                    </h2>

                    <p className="text-gray-400">
                        Add some products to see them here
                    </p>
                </div>
            ) : (
                <div className="max-w-5xl mx-auto space-y-5">

                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white p-5 rounded-xl shadow flex flex-col md:flex-row items-center justify-between gap-6"
                        >
                            {/* IMAGE + TITLE */}
                            <div className="flex items-center gap-4 w-full md:w-auto">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-20 w-20 object-contain"
                                />

                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {item.title}
                                    </h3>

                                    <p className="text-green-600 font-bold mt-1">
                                        ${item.price}
                                    </p>
                                </div>
                            </div>

                            {/* QUANTITY */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => decreaseQty(item.id)}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>

                                <span className="font-semibold">
                                    {item.qty}
                                </span>

                                <button
                                    onClick={() => increaseQty(item.id)}
                                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>

                            {/* REMOVE */}
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 font-semibold hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* TOTAL SECTION */}
                    <div className="bg-white p-6 rounded-xl shadow text-right">
                        <h2 className="text-2xl font-bold">
                            Total: ${total.toFixed(2)}
                        </h2>

                        <button onClick={handleCheckout} className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
                            Checkout
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Cart;