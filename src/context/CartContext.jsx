import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState([]);

    // Get currently logged-in user
    const getCurrentUser = () => {
        try {
            const savedUser = localStorage.getItem("user");

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

    // Create unique cart key for each user
    const getCartKey = () => {

        const user = getCurrentUser();

        if (!user) {
            return null;
        }

        // Prefer user ID
        if (user.id) {
            return `swaglow_cart_${user.id}`;
        }

        // Fallback to email
        if (user.email) {
            return `swaglow_cart_${user.email}`;
        }

        return null;
    };


    // Load cart whenever logged-in user changes
    useEffect(() => {

        const cartKey = getCartKey();

        if (!cartKey) {
            setCartItems([]);
            return;
        }

        try {

            const savedCart =
                localStorage.getItem(cartKey);

            if (savedCart) {

                const parsedCart =
                    JSON.parse(savedCart);

                setCartItems(
                    Array.isArray(parsedCart)
                        ? parsedCart
                        : []
                );

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

    }, []);


    // Save cart for current user
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

        } catch (error) {

            console.error(
                "SAVE CART ERROR:",
                error
            );
        }

    }, [cartItems]);


    // ============================
    // ADD TO CART
    // ============================

    const addToCart = (product) => {

        const user = getCurrentUser();

        if (!user) {
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

                return currentItems.map(
                    (item) => {

                        const itemId =
                            item._id || item.id;

                        if (itemId !== productId) {
                            return item;
                        }

                        const currentQuantity =
                            Number(
                                item.quantity || 1
                            );

                        const stock =
                            Number(
                                item.stock || 0
                            );

                        // Don't exceed stock
                        if (
                            stock > 0 &&
                            currentQuantity >= stock
                        ) {
                            return item;
                        }

                        return {
                            ...item,
                            quantity:
                                currentQuantity + 1,
                        };
                    }
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


    // ============================
    // REMOVE FROM CART
    // ============================

    const removeFromCart = (productId) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    (item._id || item.id) !==
                    productId
            )
        );
    };


    // ============================
    // INCREASE QUANTITY
    // ============================

    const increaseQuantity = (productId) => {

        setCartItems((currentItems) =>
            currentItems.map((item) => {

                const itemId =
                    item._id || item.id;

                if (itemId !== productId) {
                    return item;
                }

                const currentQuantity =
                    Number(
                        item.quantity || 1
                    );

                const stock =
                    Number(
                        item.stock || 0
                    );

                if (
                    stock > 0 &&
                    currentQuantity >= stock
                ) {
                    return item;
                }

                return {
                    ...item,
                    quantity:
                        currentQuantity + 1,
                };
            })
        );
    };


    // ============================
    // DECREASE QUANTITY
    // ============================

    const decreaseQuantity = (productId) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) => {

                    const itemId =
                        item._id || item.id;

                    if (itemId !== productId) {
                        return item;
                    }

                    const currentQuantity =
                        Number(
                            item.quantity || 1
                        );

                    if (currentQuantity <= 1) {
                        return null;
                    }

                    return {
                        ...item,
                        quantity:
                            currentQuantity - 1,
                    };
                })
                .filter(Boolean)
        );
    };


    // ============================
    // CLEAR CART
    // ============================

    const clearCart = () => {
        setCartItems([]);
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


// ============================
// USE CART
// ============================

export const useCart = () => {

    const context = useContext(
        CartContext
    );

    if (!context) {
        throw new Error(
            "useCart must be used inside CartProvider"
        );
    }

    return context;
};