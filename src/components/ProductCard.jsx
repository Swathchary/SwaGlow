import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const [added, setAdded] = useState(false);

    const handleAddToCart = (e) => {
        e.stopPropagation();

        addToCart(product);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 1500);
    };

    const handleProductClick = () => {
        navigate(`/customer/products/${product._id}`);
    };

    const isOutOfStock = !product.stock || product.stock <= 0;

    return (
        <div
            className="
                bg-white
                dark:bg-gray-900
                rounded-2xl
                overflow-hidden
                border
                border-gray-100
                dark:border-gray-800
                shadow-sm
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                cursor-pointer
            "
            onClick={handleProductClick}
        >

            {/* =========================
                PRODUCT IMAGE
            ========================== */}

            <div className="
                h-56
                sm:h-60
                bg-gray-100
                dark:bg-gray-800
                overflow-hidden
            ">

                {product.image ? (
                    <img
                        src={product.image}
                        alt={product.name}
                        className="
                            w-full
                            h-full
                            object-cover
                            hover:scale-105
                            transition-transform
                            duration-300
                        "
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                        }}
                    />
                ) : (
                    <div className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        text-sm
                    ">
                        No Image
                    </div>
                )}

            </div>

            {/* =========================
                PRODUCT DETAILS
            ========================== */}

            <div className="p-5">

                {/* CATEGORY */}

                <p className="
                    text-xs
                    text-pink-600
                    dark:text-pink-400
                    font-semibold
                    uppercase
                    tracking-wide
                ">
                    {product.category}
                </p>

                {/* PRODUCT NAME */}

                <h3 className="
                    mt-2
                    font-bold
                    text-lg
                    text-gray-800
                    dark:text-gray-100
                    line-clamp-2
                    min-h-[56px]
                ">
                    {product.name}
                </h3>

                {/* DESCRIPTION */}

                {product.description && (
                    <p className="
                        mt-2
                        text-sm
                        text-gray-500
                        dark:text-gray-400
                        line-clamp-2
                    ">
                        {product.description}
                    </p>
                )}

                {/* PRICE */}

                <div className="mt-4">

                    <span className="
                        text-xl
                        font-black
                        text-pink-600
                        dark:text-pink-400
                    ">
                        ₹{product.price}
                    </span>

                </div>

                {/* STOCK */}

                <p className="
                    mt-1
                    text-sm
                    text-gray-500
                    dark:text-gray-400
                ">
                    {isOutOfStock
                        ? "Out of Stock"
                        : `Stock: ${product.stock}`}
                </p>

                {/* ADD TO CART */}

                <button
                    type="button"
                    disabled={isOutOfStock}
                    onClick={handleAddToCart}
                    className={`
                        w-full
                        mt-4
                        px-4
                        py-3
                        rounded-xl
                        font-semibold
                        text-white
                        transition-all
                        duration-300

                        ${
                            added
                                ? "bg-green-500"
                                : isOutOfStock
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500"
                        }
                    `}
                >
                    {added
                        ? "✓ Added to Cart"
                        : isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>

            </div>

        </div>
    );
};

export default ProductCard;