import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    XCircle,
    CreditCard,
    ArrowLeft,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const TestPayment = () => {
    const navigate = useNavigate();

    const { clearCart } = useCart();

    const [processing, setProcessing] = useState(false);

    const pendingOrder = JSON.parse(
        sessionStorage.getItem("swaglow_pending_order") || "null"
    );

    if (!pendingOrder) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">

                <div className="text-center">

                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                        No Payment Found
                    </h1>

                    <button
                        type="button"
                        onClick={() => navigate("/customer/cart")}
                        className="mt-5 px-6 py-3 rounded-xl bg-purple-600 text-white font-bold"
                    >
                        Go to Cart
                    </button>

                </div>

            </div>
        );
    }

    const handlePayment = (success) => {
        setProcessing(true);

        setTimeout(() => {

            if (success) {

                const finalOrder = {
                    ...pendingOrder,
                    paymentStatus: "Paid",
                    paymentId: `TEST_${Date.now()}`,
                    orderId: `SWG_${Date.now()}`,
                };

                // Save completed order
                sessionStorage.setItem(
                    "swaglow_last_order",
                    JSON.stringify(finalOrder)
                );

                // Remove pending order
                sessionStorage.removeItem(
                    "swaglow_pending_order"
                );

                // IMPORTANT: Empty cart after successful payment
                clearCart();

                // Go to success page
                navigate("/customer/OrderSucess", {
                    replace: true,
                });
            } else {

                setProcessing(false);

                alert(
                    "Test payment failed. Your cart and order are still محفوظ."
                );
            }

        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">

            <div className="max-w-lg mx-auto">

                <button
                    type="button"
                    onClick={() =>
                        navigate("/customer/checkout")
                    }
                    className="flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-purple-600 transition"
                >
                    <ArrowLeft size={18} />
                    Back to Checkout
                </button>


                <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm">

                    <div className="text-center">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">

                            <CreditCard
                                size={30}
                                className="text-purple-600"
                            />

                        </div>

                        <h1 className="mt-5 text-2xl font-black text-gray-900 dark:text-white">
                            Test Payment
                        </h1>

                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Development payment simulator
                        </p>

                    </div>


                    <div className="mt-7 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                        <div className="flex justify-between">

                            <span className="text-gray-500 dark:text-gray-400">
                                Amount
                            </span>

                            <span className="text-2xl font-black text-purple-600">
                                ₹
                                {Number(
                                    pendingOrder.total
                                ).toLocaleString("en-IN")}
                            </span>

                        </div>

                    </div>


                    <div className="mt-6 space-y-3">

                        <button
                            type="button"
                            disabled={processing}
                            onClick={() =>
                                handlePayment(true)
                            }
                            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold disabled:opacity-50"
                        >
                            <CheckCircle size={20} />

                            {processing
                                ? "Processing..."
                                : "Test Successful Payment"}
                        </button>


                        {!processing && (
                            <button
                                type="button"
                                onClick={() =>
                                    handlePayment(false)
                                }
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 font-bold"
                            >
                                <XCircle size={20} />
                                Test Failed Payment
                            </button>
                        )}

                    </div>


                    <div className="mt-6 rounded-xl border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 p-4">

                        <p className="text-sm text-yellow-700 dark:text-yellow-400">
                            <strong>Test Mode:</strong> No real
                            money will be charged.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default TestPayment;