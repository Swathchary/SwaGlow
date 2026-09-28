import { useNavigate } from "react-router-dom";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const Cart = () => {
    const navigate = useNavigate();

    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 1),
        0
    );

    const deliveryCharge = subtotal > 0 && subtotal < 500 ? 50 : 0;

    const total = subtotal + deliveryCharge;

    // Empty cart
    if (!cartItems || cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-10">

                <div className="max-w-5xl mx-auto">

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 sm:p-16 text-center shadow-sm">

                        <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <ShoppingCart
                                size={38}
                                className="text-pink-600 dark:text-pink-400"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-black text-gray-900 dark:text-white">
                            Your Cart is Empty
                        </h1>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            Looks like you haven't added anything to your cart yet.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/customer/products")
                            }
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                px-7
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
                            "
                        >
                            <ShoppingBag size={19} />
                            Continue Shopping
                        </button>

                    </div>

                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 sm:px-6 lg:px-8 py-8">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                    <div>
                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                                <ShoppingCart
                                    size={24}
                                    className="text-white"
                                />
                            </div>

                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                                    Shopping Cart
                                </h1>

                                <p className="text-gray-500 dark:text-gray-400 mt-1">
                                    {cartItems.length}{" "}
                                    {cartItems.length === 1
                                        ? "item"
                                        : "items"}{" "}
                                    in your cart
                                </p>
                            </div>

                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer/products")
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            text-purple-600
                            dark:text-purple-400
                            font-bold
                            hover:text-pink-600
                            transition
                        "
                    >
                        <ArrowLeft size={18} />
                        Continue Shopping
                    </button>

                </div>

                {/* MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CART ITEMS */}
                    <div className="lg:col-span-2 space-y-4">

                        {cartItems.map((item) => {

                            const quantity = Number(
                                item.quantity || 1
                            );

                            const itemTotal =
                                Number(item.price || 0) *
                                quantity;

                            const stock = Number(
                                item.stock || 0
                            );

                            return (
                                <div
                                    key={item._id || item.id}
                                    className="
                                        bg-white
                                        dark:bg-gray-900
                                        border
                                        border-gray-200
                                        dark:border-gray-800
                                        rounded-2xl
                                        p-4
                                        sm:p-5
                                        shadow-sm
                                    "
                                >

                                    <div className="flex gap-4">

                                        {/* IMAGE */}
                                        <div className="w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">

                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                                                    No Image
                                                </div>
                                            )}

                                        </div>

                                        {/* DETAILS */}
                                        <div className="flex-1 min-w-0">

                                            <div className="flex justify-between gap-3">

                                                <div>

                                                    <p className="text-xs uppercase tracking-wide font-semibold text-pink-600 dark:text-pink-400">
                                                        {item.category}
                                                    </p>

                                                    <h2 className="mt-1 text-lg sm:text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                                                        {item.name}
                                                    </h2>

                                                </div>

                                                {/* DELETE */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeFromCart(
                                                            item._id ||
                                                                item.id
                                                        )
                                                    }
                                                    className="
                                                        flex-shrink-0
                                                        p-2
                                                        rounded-lg
                                                        text-red-500
                                                        hover:bg-red-50
                                                        dark:hover:bg-red-900/20
                                                        transition
                                                    "
                                                    aria-label="Remove product"
                                                >
                                                    <Trash2 size={19} />
                                                </button>

                                            </div>

                                            {/* PRICE */}
                                            <p className="mt-2 text-xl font-black text-purple-600 dark:text-purple-400">
                                                ₹
                                                {Number(
                                                    item.price || 0
                                                ).toLocaleString("en-IN")}
                                            </p>

                                            {/* QUANTITY + TOTAL */}
                                            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                                                {/* QUANTITY */}
                                                <div className="flex items-center gap-3">

                                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                                        Quantity
                                                    </span>

                                                    <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                decreaseQuantity(
                                                                    item._id ||
                                                                        item.id
                                                                )
                                                            }
                                                            disabled={
                                                                quantity <=
                                                                1
                                                            }
                                                            className="
                                                                p-2
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                disabled:opacity-40
                                                                disabled:cursor-not-allowed
                                                            "
                                                        >
                                                            <Minus
                                                                size={16}
                                                            />
                                                        </button>

                                                        <span className="px-4 font-bold text-gray-900 dark:text-white">
                                                            {quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                increaseQuantity(
                                                                    item._id ||
                                                                        item.id
                                                                )
                                                            }
                                                            disabled={
                                                                stock > 0 &&
                                                                quantity >=
                                                                    stock
                                                            }
                                                            className="
                                                                p-2
                                                                hover:bg-gray-100
                                                                dark:hover:bg-gray-800
                                                                disabled:opacity-40
                                                                disabled:cursor-not-allowed
                                                            "
                                                        >
                                                            <Plus
                                                                size={16}
                                                            />
                                                        </button>

                                                    </div>

                                                </div>

                                                {/* ITEM TOTAL */}
                                                <div className="text-left sm:text-right">

                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        Item Total
                                                    </p>

                                                    <p className="text-lg font-black text-gray-900 dark:text-white">
                                                        ₹
                                                        {itemTotal.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    {/* ORDER SUMMARY */}
                    <div className="lg:col-span-1">

                        <div className="
                            bg-white
                            dark:bg-gray-900
                            border
                            border-gray-200
                            dark:border-gray-800
                            rounded-2xl
                            p-6
                            shadow-sm
                            lg:sticky
                            lg:top-24
                        ">

                            <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                Order Summary
                            </h2>

                            <div className="mt-6 space-y-4">

                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>
                                        Subtotal
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ₹
                                        {subtotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>
                                        Delivery
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {deliveryCharge === 0
                                            ? "FREE"
                                            : `₹${deliveryCharge}`}
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-800 pt-4">

                                    <div className="flex justify-between">

                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            Total
                                        </span>

                                        <span className="text-2xl font-black text-purple-600 dark:text-purple-400">
                                            ₹
                                            {total.toLocaleString(
                                                "en-IN"
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* CHECKOUT */}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/customer/checkout")
                                }
                                className="
                                    w-full
                                    mt-7
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    px-5
                                    py-4
                                    rounded-xl
                                    bg-gradient-to-r
                                    from-pink-500
                                    to-purple-600
                                    text-white
                                    font-bold
                                    text-lg
                                    hover:from-purple-600
                                    hover:to-pink-500
                                    transition
                                    shadow-lg
                                "
                            >
                                Proceed to Checkout
                                <ArrowRight size={20} />
                            </button>

                            <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                                Secure checkout • Safe & trusted shopping
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Cart;