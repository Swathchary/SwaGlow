import { useContext, useState } from "react";
import { CartContext } from "../CartContext";

const Checkout = () => {
    const { cart } = useContext(CartContext);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        alert(`Order placed successfully 🎉
Name: ${form.name}
Total: $${total.toFixed(2)}`);

        console.log("Order Details:", {
            customer: form,
            cart,
            total,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">

            <h1 className="text-3xl font-bold text-center mb-10">
                Checkout 🧾
            </h1>

            {cart.length === 0 ? (
                <h2 className="text-center text-gray-500 text-xl">
                    Your cart is empty 🛒
                </h2>
            ) : (
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">

                    {/* LEFT - FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white p-6 rounded-xl shadow space-y-4"
                    >
                        <h2 className="text-xl font-bold mb-4">
                            Customer Details
                        </h2>

                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <textarea
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                        >
                            Place Order
                        </button>
                    </form>

                    {/* RIGHT - ORDER SUMMARY */}
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="text-xl font-bold mb-4">
                            Order Summary
                        </h2>

                        <div className="space-y-3 max-h-64 overflow-y-auto">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between border-b pb-2"
                                >
                                    <span>{item.title}</span>
                                    <span>
                                        {item.qty} x ${item.price}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 text-right">
                            <h3 className="text-2xl font-bold">
                                Total: ${total.toFixed(2)}
                            </h3>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Checkout;