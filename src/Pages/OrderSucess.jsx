import { useNavigate } from "react-router-dom";
import {
    CheckCircle,
    ShoppingBag,
    ArrowRight,
    Package,
} from "lucide-react";

const OrderSuccess = () => {
    const navigate = useNavigate();

    let order = null;

    try {
        const savedOrder =
            sessionStorage.getItem(
                "swaglow_last_order"
            );

        if (savedOrder) {
            order = JSON.parse(savedOrder);
        }
    } catch (error) {
        console.error(
            "ORDER DATA ERROR:",
            error
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 px-4 py-10">

            <div className="max-w-3xl mx-auto">

                {/* SUCCESS CARD */}
                <div className="
                    bg-white
                    dark:bg-gray-900
                    border
                    border-gray-200
                    dark:border-gray-800
                    rounded-3xl
                    p-8
                    sm:p-12
                    text-center
                    shadow-sm
                ">

                    {/* ICON */}
                    <div className="
                        w-24
                        h-24
                        mx-auto
                        rounded-full
                        bg-green-100
                        dark:bg-green-900/30
                        flex
                        items-center
                        justify-center
                    ">
                        <CheckCircle
                            size={58}
                            className="text-green-500"
                        />
                    </div>

                    <p className="mt-6 text-sm font-bold uppercase tracking-wider text-green-600">
                        Order Confirmed
                    </p>

                    <h1 className="
                        mt-2
                        text-3xl
                        sm:text-4xl
                        font-black
                        text-gray-900
                        dark:text-white
                    ">
                        Thank You for Your Order!
                    </h1>

                    <p className="
                        mt-4
                        text-gray-500
                        dark:text-gray-400
                        max-w-xl
                        mx-auto
                    ">
                        Your order has been placed successfully.
                        We will deliver your products to the address
                        you provided.
                    </p>

                    {/* ORDER DETAILS */}
                    {order && (
                        <div className="
                            mt-8
                            text-left
                            bg-gray-50
                            dark:bg-gray-800
                            rounded-2xl
                            p-5
                        ">

                            <div className="flex items-center gap-3 mb-5">

                                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                    <Package
                                        size={20}
                                        className="text-purple-600"
                                    />
                                </div>

                                <div>
                                    <h2 className="font-black text-gray-900 dark:text-white">
                                        Order Details
                                    </h2>

                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Cash on Delivery
                                    </p>
                                </div>

                            </div>

                            <div className="space-y-3">

                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Customer
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white text-right">
                                        {
                                            order
                                                .deliveryDetails
                                                ?.name
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Phone
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {
                                            order
                                                .deliveryDetails
                                                ?.phone
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-500 dark:text-gray-400">
                                        Items
                                    </span>

                                    <span className="font-semibold text-gray-900 dark:text-white">
                                        {
                                            order.items
                                                ?.length || 0
                                        }
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4 border-t border-gray-200 dark:border-gray-700 pt-3">
                                    <span className="font-bold text-gray-900 dark:text-white">
                                        Total
                                    </span>

                                    <span className="font-black text-xl text-purple-600">
                                        ₹
                                        {Number(
                                            order.total || 0
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                </div>

                            </div>

                        </div>
                    )}

                    {/* BUTTONS */}
                    <div className="
                        mt-8
                        flex
                        flex-col
                        sm:flex-row
                        justify-center
                        gap-3
                    ">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/customer/products"
                                )
                            }
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-6
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

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/customer"
                                )
                            }
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-6
                                py-3
                                rounded-xl
                                border
                                border-gray-200
                                dark:border-gray-700
                                text-gray-700
                                dark:text-gray-200
                                font-bold
                                hover:bg-gray-100
                                dark:hover:bg-gray-800
                                transition
                            "
                        >
                            Home
                            <ArrowRight size={18} />
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default OrderSuccess;