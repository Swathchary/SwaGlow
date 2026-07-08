import React from "react";
import { useLocation, Link } from "react-router-dom";

function OrderSucess() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);

  const name = params.get("name");
  const total = params.get("total");
  
  
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-5">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-10 text-center">
    
    <div className="text-6xl mb-4">
      🎉
    </div>

    <h1 className="text-4xl font-bold text-green-600 mb-4">
      Order Placed Successfully!
    </h1>

    <p className="text-gray-500 mb-8 text-lg">
      Thank you for your purchase. Your order has been confirmed.
    </p>

    <div className="w-full bg-gray-50 rounded-xl p-6 mb-8">
      <div className="flex justify-between py-4 border-b text-lg">
        <span className="text-gray-500">Name</span>
        <span className="font-semibold">{name}</span>
      </div>

      <div className="flex justify-between py-4 text-lg">
        <span className="text-gray-500">Total Amount</span>
        <span className="font-semibold">${total}</span>
      </div>
    </div>

    <Link
      to="/"
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition"
    >
      Continue Shopping
    </Link>

  </div>
</div>
  );
}

export default OrderSucess;