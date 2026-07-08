
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../CartContext";


const Home = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState([]);
    const { addToCart } = useContext(CartContext);

    const getProducts = async () => {

        try {
            setLoading(true)
            const response = await fetch("https://fakestoreapi.com/products");

            const data = await response.json();

            console.log('response', data)
            setProducts(data);
            setLoading(false)

        } catch (error) {
            console.log("error", error)
        } finally {

            setLoading(false)
            console.log("finally")

        }

    }



    useEffect(() => {

        getProducts();

    }, []);


    const handleAddToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);

        console.log("Added to cart:", product);
    };

    return (

        <div>

            <section className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">

                <div className="max-w-7xl mx-auto px-6 py-16 text-center">
                    <h1 className="text-5xl font-bold mb-4">
                        Welcome to SwaGlow
                    </h1>

                    <p className="text-lg mb-8">
                        Discover amazing products at great prices.
                    </p>

                    {/* <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:bg-indigo-100 transition duration-300">
                        Shop Now
                    </button> */}
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16">
                <h2 className="text-3xl font-bold mb-10 text-center">
                    Featured Products
                </h2>

                {loading ? (
                    <div className="text-center text-lg">
                        Loading products...
                    </div>
                ) : (


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-56 w-full object-contain p-4"
                                />

                                <div className="p-4">
                                    <h3 className="font-semibold text-sm h-12 overflow-hidden">
                                        {item.title}
                                    </h3>

                                    <p className="text-yellow-500 mt-2">
                                        ⭐ {item.rating.rate}
                                    </p>

                                    <p className="text-blue-600 font-bold text-lg mt-2">
                                        ${item.price}
                                    </p>

                                    <button onClick={() => addToCart(item)}
                                        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            <section className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why Shop With Us?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white p-6 rounded-xl text-center shadow">
                            <h3 className="font-semibold text-xl mb-2">
                                Fast Delivery
                            </h3>
                            <p>Get your products delivered quickly.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl text-center shadow">
                            <h3 className="font-semibold text-xl mb-2">
                                Secure Payments
                            </h3>
                            <p>Safe and trusted payment methods.</p>
                        </div>

                        <div className="bg-white p-6 rounded-xl text-center shadow">
                            <h3 className="font-semibold text-xl mb-2">
                                Quality Products
                            </h3>
                            <p>Best products from trusted brands.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Home;