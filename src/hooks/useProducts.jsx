import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://glow-mchc.onrender.com/api";

const useProducts = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");

                if (!token) {
                    navigate("/login", { replace: true });
                    return;
                }

                const response = await fetch(
                    `${API_URL}/products`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await response.json();

                console.log("CUSTOMER PRODUCTS:", data);

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch products"
                    );
                }

                const formattedProducts = (data.products || []).map(
                    (product) => ({
                        ...product,
                        id: product._id,
                    })
                );

                setProducts(formattedProducts);
            } catch (error) {
                console.error("FETCH PRODUCTS ERROR:", error);

                setError(
                    error.message || "Unable to load products"
                );

                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    return {
        products,
        loading,
        error,
    };
};

export default useProducts;