import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    MapPin,
    Phone,
    User,
    ArrowLeft,
    ArrowRight,
    ShoppingBag,
    CreditCard,
    Truck,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const Checkout = () => {
    const navigate = useNavigate();

    const {
        cartItems,
        clearCart,
    } = useCart();

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [error, setError] = useState("");

    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [isProcessing, setIsProcessing] = useState(false);

    // Calculate subtotal
    const subtotal = cartItems.reduce(
        (total, item) =>
            total +
            Number(item.price || 0) *
            Number(item.quantity || 1),
        0
    );

    const deliveryCharge =
        subtotal > 0 && subtotal < 500 ? 50 : 0;

    const total = subtotal + deliveryCharge;

    // Handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    // Place order
    const handlePlaceOrder = (event) => {
        event.preventDefault();

        if (cartItems.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        if (
            !form.name.trim() ||
            !form.phone.trim() ||
            !form.address.trim() ||
            !form.city.trim() ||
            !form.state.trim() ||
            !form.pincode.trim()
        ) {
            setError("Please fill in all delivery details.");
            return;
        }

        if (!/^[0-9]{10}$/.test(form.phone.trim())) {
            setError("Please enter a valid 10-digit phone number.");
            return;
        }

        if (!/^[0-9]{6}$/.test(form.pincode.trim())) {
            setError("Please enter a valid 6-digit PIN code.");
            return;
        }

        setError("");

        // -------------------------
        // CASH ON DELIVERY
        // -------------------------
        if (paymentMethod === "cod") {

            const orderData = {
                items: cartItems,
                deliveryDetails: form,
                subtotal,
                deliveryCharge,
                total,
                paymentMethod: "Cash on Delivery",
                paymentStatus: "Pending",
            };

            sessionStorage.setItem(
                "swaglow_last_order",
                JSON.stringify(orderData)
            );

            clearCart();

            navigate("/customer/OrderSucess", {
                replace: true,
            });

            return;
        }

        // -------------------------
        // TEST PAYMENT
        // -------------------------
        if (paymentMethod === "test") {

            const orderData = {
                items: cartItems,
                deliveryDetails: form,
                subtotal,
                deliveryCharge,
                total,
                paymentMethod: "Test Payment",
                paymentStatus: "Pending",
            };

            sessionStorage.setItem(
                "swaglow_pending_order",
                JSON.stringify(orderData)
            );

            navigate("/customer/testpayment", {
                replace: true,
            });

            return;
        }
    };    // Empty cart
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">

                <div className="max-w-3xl mx-auto">

                    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center">

                        <div className="w-20 h-20 mx-auto rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center">
                            <ShoppingBag
                                size={38}
                                className="text-pink-600"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-black text-gray-900 dark:text-white">
                            Your Cart is Empty
                        </h1>

                        <p className="mt-3 text-gray-500 dark:text-gray-400">
                            Add some products before proceeding to checkout.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/customer/products"
                                )
                            }
                            className="
                                mt-7
                                px-6
                                py-3
                                rounded-xl
                                bg-gradient-to-r
                                from-pink-500
                                to-purple-600
                                text-white
                                font-bold
                            "
                        >
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
                <div className="mb-8">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/customer/cart")
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            text-gray-500
                            dark:text-gray-400
                            hover:text-purple-600
                            transition
                        "
                    >
                        <ArrowLeft size={18} />
                        Back to Cart
                    </button>

                    <h1 className="mt-5 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white">
                        Checkout
                    </h1>

                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                        Complete your delivery details to place your order.
                    </p>

                </div>

                {/* ERROR */}
                {error && (
                    <div className="mb-6 max-w-7xl mx-auto">

                        <div className="rounded-xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 px-5 py-4 text-red-600 dark:text-red-400 font-medium">
                            {error}
                        </div>

                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* DELIVERY FORM */}
                    <div className="lg:col-span-2">

                        <form
                            id="checkout-form"
                            onSubmit={handlePlaceOrder}
                            className="
                                bg-white
                                dark:bg-gray-900
                                border
                                border-gray-200
                                dark:border-gray-800
                                rounded-2xl
                                p-6
                                sm:p-8
                                shadow-sm
                            "
                        >

                            <div className="flex items-center gap-3 mb-7">

                                <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <MapPin
                                        size={22}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                        Delivery Details
                                    </h2>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Where should we deliver your order?
                                    </p>
                                </div>

                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* NAME */}
                                <div className="sm:col-span-2">

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            autoComplete="name"
                                            className="
                                                w-full
                                                pl-11
                                                pr-4
                                                py-3.5
                                                rounded-xl
                                                border
                                                border-gray-200
                                                dark:border-gray-700
                                                bg-white
                                                dark:bg-gray-800
                                                text-gray-900
                                                dark:text-white
                                                outline-none
                                                focus:ring-2
                                                focus:ring-purple-500
                                            "
                                        />

                                    </div>

                                </div>

                                {/* PHONE */}
                                <div className="sm:col-span-2">

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Phone Number
                                    </label>

                                    <div className="relative">

                                        <Phone
                                            size={19}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                        />

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="10-digit phone number"
                                            autoComplete="tel"
                                            maxLength={10}
                                            className="
                                                w-full
                                                pl-11
                                                pr-4
                                                py-3.5
                                                rounded-xl
                                                border
                                                border-gray-200
                                                dark:border-gray-700
                                                bg-white
                                                dark:bg-gray-800
                                                text-gray-900
                                                dark:text-white
                                                outline-none
                                                focus:ring-2
                                                focus:ring-purple-500
                                            "
                                        />

                                    </div>

                                </div>

                                {/* ADDRESS */}
                                <div className="sm:col-span-2">

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        Delivery Address
                                    </label>

                                    <textarea
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        placeholder="House number, street, area..."
                                        rows={4}
                                        autoComplete="street-address"
                                        className="
                                            w-full
                                            px-4
                                            py-3.5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-800
                                            text-gray-900
                                            dark:text-white
                                            outline-none
                                            resize-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />

                                </div>

                                {/* CITY */}
                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={form.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        autoComplete="address-level2"
                                        className="
                                            w-full
                                            px-4
                                            py-3.5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-800
                                            text-gray-900
                                            dark:text-white
                                            outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />

                                </div>

                                {/* STATE */}
                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={form.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        autoComplete="address-level1"
                                        className="
                                            w-full
                                            px-4
                                            py-3.5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-800
                                            text-gray-900
                                            dark:text-white
                                            outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />

                                </div>

                                {/* PIN */}
                                <div>

                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        PIN Code
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={form.pincode}
                                        onChange={handleChange}
                                        placeholder="6-digit PIN"
                                        autoComplete="postal-code"
                                        maxLength={6}
                                        className="
                                            w-full
                                            px-4
                                            py-3.5
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-gray-700
                                            bg-white
                                            dark:bg-gray-800
                                            text-gray-900
                                            dark:text-white
                                            outline-none
                                            focus:ring-2
                                            focus:ring-purple-500
                                        "
                                    />

                                </div>

                            </div>

                            {/* PAYMENT */}
                            {/* PAYMENT */}
                            <div className="mt-8 pt-7 border-t border-gray-200 dark:border-gray-800">

                                <div className="flex items-center gap-3">

                                    <div className="w-11 h-11 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <CreditCard
                                            size={22}
                                            className="text-green-600"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-black text-gray-900 dark:text-white">
                                            Payment Method
                                        </h2>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Choose how you want to pay
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5 space-y-4">

                                    {/* CASH ON DELIVERY */}
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("cod")}
                                        className={`w-full text-left rounded-xl border-2 p-4 transition ${paymentMethod === "cod"
                                            ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                                            : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                                            }`}
                                    >

                                        <div className="flex items-center gap-4">

                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                                <Truck
                                                    size={20}
                                                    className="text-purple-600"
                                                />
                                            </div>

                                            <div className="flex-1">

                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    Cash on Delivery
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Pay when your order arrives.
                                                </p>

                                            </div>

                                            <div
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "cod"
                                                    ? "border-purple-600"
                                                    : "border-gray-400"
                                                    }`}
                                            >
                                                {paymentMethod === "cod" && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                                                )}
                                            </div>

                                        </div>

                                    </button>


                                    {/* TEST PAYMENT */}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            console.log("TEST PAYMENT SELECTED");
                                            setPaymentMethod("test");
                                            setError("");
                                        }}
                                        className={`w-full text-left rounded-xl border-2 p-4 transition ${paymentMethod === "test"
                                                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                                                : "border-gray-200 dark:border-gray-700 hover:border-green-300"
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">

                                            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center">
                                                <CreditCard
                                                    size={20}
                                                    className="text-green-600"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <p className="font-bold text-gray-900 dark:text-white">
                                                    Test Payment
                                                </p>

                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Test payment without real money
                                                </p>
                                            </div>

                                            <div
                                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === "test"
                                                        ? "border-green-600"
                                                        : "border-gray-400"
                                                    }`}
                                            >
                                                {paymentMethod === "test" && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-600" />
                                                )}
                                            </div>

                                        </div>
                                    </button>

                                </div>

                            </div>
                            {/* PLACE ORDER MOBILE */}
                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="
        w-full
        mt-8
        lg:hidden
        flex
        items-center
        justify-center
        gap-2
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
        disabled:opacity-50
        disabled:cursor-not-allowed
    "
                            >
                                {isProcessing
                                    ? "Processing..."
                                    : paymentMethod === "cod"
                                        ? "Place Order"
                                        : `Pay ₹${total.toLocaleString("en-IN")}`}

                                {!isProcessing && <ArrowRight size={20} />}
                            </button>

                        </form>

                    </div>

                    {/* ORDER SUMMARY */}
                    <div>

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

                            {/* ITEMS */}
                            <div className="mt-5 space-y-4 max-h-80 overflow-y-auto">

                                {cartItems.map((item) => (

                                    <div
                                        key={
                                            item._id ||
                                            item.id
                                        }
                                        className="flex gap-3"
                                    >

                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0">

                                            {item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                                                    No Image
                                                </div>
                                            )}

                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <p className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                                                {item.name}
                                            </p>

                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Qty:{" "}
                                                {item.quantity ||
                                                    1}
                                            </p>

                                        </div>

                                        <p className="font-bold text-gray-900 dark:text-white">
                                            ₹
                                            {(
                                                Number(
                                                    item.price ||
                                                    0
                                                ) *
                                                Number(
                                                    item.quantity ||
                                                    1
                                                )
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
                                        </p>

                                    </div>

                                ))}

                            </div>

                            <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-5 space-y-4">

                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Subtotal</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        ₹
                                        {subtotal.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                    <span>Delivery</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {deliveryCharge ===
                                            0
                                            ? "FREE"
                                            : `₹${deliveryCharge}`}
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between">

                                    <span className="text-lg font-black text-gray-900 dark:text-white">
                                        Total
                                    </span>

                                    <span className="text-2xl font-black text-purple-600">
                                        ₹
                                        {total.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>

                                </div>

                            </div>

                            {/* DESKTOP PLACE ORDER */}
                            <button
                                type="submit"
                                    form="checkout-form"
                                className="
        w-full
        mt-7
        hidden
        lg:flex
        items-center
        justify-center
        gap-2
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
    "
                            >
                                {paymentMethod === "cod"
                                    ? "Place Order"
                                    : `Pay ₹${total.toLocaleString("en-IN")}`}

                                <ArrowRight size={20} />
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Checkout;