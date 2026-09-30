import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    // ==========================================
    // GET CURRENT USER
    // ==========================================

    const getCurrentUser = () => {
        try {
            const savedUser =
                localStorage.getItem("user");

            if (!savedUser) {
                return null;
            }

            return JSON.parse(savedUser);
        } catch (error) {
            console.error(
                "GET USER ERROR:",
                error
            );

            return null;
        }
    };

    // ==========================================
    // GET USER ID
    // ==========================================

    const getUserId = () => {
        const user = getCurrentUser();

        if (!user) {
            return null;
        }

        return (
            user.id ||
            user._id ||
            user.email ||
            null
        );
    };

    // ==========================================
    // CHECK LOGGED-IN USER
    // ==========================================

    useEffect(() => {
        const checkUser = () => {
            const userId = getUserId();

            setCurrentUserId(userId);
        };

        // Check immediately
        checkUser();

        // Check whenever storage changes
        window.addEventListener(
            "storage",
            checkUser
        );

        window.addEventListener(
            "userChanged",
            checkUser
        );

        return () => {
            window.removeEventListener(
                "storage",
                checkUser
            );

            window.removeEventListener(
                "userChanged",
                checkUser
            );
        };

    }, []);

    // ==========================================
    // CART KEY
    // ==========================================

    const getCartKey = () => {
        if (!currentUserId) {
            return null;
        }

        return `swaglow_cart_${currentUserId}`;
    };

    // ==========================================
    // LOAD USER CART
    // ==========================================

    useEffect(() => {
        const cartKey = getCartKey();

        console.log(
            "LOADING CART FOR:",
            currentUserId
        );

        console.log(
            "CART KEY:",
            cartKey
        );

        if (!cartKey) {
            setCartItems([]);
            return;
        }

        try {
            const savedCart =
                localStorage.getItem(cartKey);

            console.log(
                "SAVED USER CART:",
                savedCart
            );

            if (savedCart) {
                const parsedCart =
                    JSON.parse(savedCart);

                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                } else {
                    setCartItems([]);
                }
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error(
                "LOAD CART ERROR:",
                error
            );

            setCartItems([]);
        }
    }, [currentUserId]);

    // ==========================================
    // SAVE USER CART
    // ==========================================

    useEffect(() => {
        const cartKey = getCartKey();

        if (!cartKey) {
            return;
        }

        try {
            localStorage.setItem(
                cartKey,
                JSON.stringify(cartItems)
            );

            console.log(
                "CART SAVED:",
                cartKey,
                cartItems
            );
        } catch (error) {
            console.error(
                "SAVE CART ERROR:",
                error
            );
        }
    }, [cartItems, currentUserId]);

    // ==========================================
    // ADD TO CART
    // ==========================================

    const addToCart = (product) => {
        if (!currentUserId) {
            console.log(
                "Cannot add to cart: user not logged in"
            );

            return;
        }

        const productId =
            product._id || product.id;

        setCartItems((currentItems) => {
            const existingItem =
                currentItems.find(
                    (item) =>
                        (item._id || item.id) ===
                        productId
                );

            if (existingItem) {
                const currentQuantity =
                    Number(
                        existingItem.quantity || 1
                    );

                const stock =
                    Number(
                        existingItem.stock || 0
                    );

                if (
                    stock > 0 &&
                    currentQuantity >= stock
                ) {
                    return currentItems;
                }

                return currentItems.map(
                    (item) =>
                        (item._id || item.id) ===
                            productId
                            ? {
                                ...item,
                                quantity:
                                    currentQuantity +
                                    1,
                            }
                            : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });
    };

    // ==========================================
    // REMOVE
    // ==========================================

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    (item._id || item.id) !==
                    productId
            )
        );
    };

    // ==========================================
    // INCREASE
    // ==========================================

    const increaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems.map((item) => {
                const itemId =
                    item._id || item.id;

                if (itemId !== productId) {
                    return item;
                }

                const quantity =
                    Number(
                        item.quantity || 1
                    );

                const stock =
                    Number(
                        item.stock || 0
                    );

                if (
                    stock > 0 &&
                    quantity >= stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity: quantity + 1,
                };
            })
        );
    };

    // ==========================================
    // DECREASE
    // ==========================================

    const decreaseQuantity = (productId) => {
        setCartItems((currentItems) =>
            currentItems
                .map((item) => {
                    const itemId =
                        item._id || item.id;

                    if (itemId !== productId) {
                        return item;
                    }

                    const quantity =
                        Number(
                            item.quantity || 1
                        );

                    if (quantity <= 1) {
                        return null;
                    }

                    return {
                        ...item,
                        quantity: quantity - 1,
                    };
                })
                .filter(Boolean)
        );
    };

    // ==========================================
    // CLEAR CART
    // ==========================================

    const clearCart = () => {
        const cartKey = getCartKey();

        setCartItems([]);

        if (cartKey) {
            localStorage.removeItem(cartKey);
        }
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// ==========================================
// USE CART
// ==========================================

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};