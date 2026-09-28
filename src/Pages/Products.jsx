import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import useProducts from "../hooks/useProducts";

const Products = () => {

    const {
        products,
        loading,
        error,
    } = useProducts();

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");

    const categories = useMemo(() => {

        return [
            ...new Set(
                products
                    .map((product) =>
                        product.category?.trim()
                    )
                    .filter(Boolean)
            ),
        ].sort();

    }, [products]);

    const filteredProducts = useMemo(() => {

        return products.filter((product) => {

            const matchesSearch =
                product.name
                    ?.toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" ||
                product.category === category;

            return (
                matchesSearch &&
                matchesCategory
            );

        });

    }, [products, search, category]);

    return (
        <div className="
            min-h-screen
            bg-gray-50
            dark:bg-gray-950
        ">

            {/* HERO */}

            <section className="
                bg-gradient-to-r
                from-pink-500
                to-purple-600
                text-white
                py-12
                text-center
            ">

                <h1 className="
                    text-4xl
                    md:text-5xl
                    font-black
                ">
                    Our Products
                </h1>

                <p className="mt-3">
                    Browse our approved products
                </p>

            </section>

            <main className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-10
            ">

                {/* SEARCH */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    gap-4
                    mb-8
                ">

                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        className="
                            flex-1
                            px-4
                            py-3
                            rounded-xl
                            border
                            border-gray-200
                            dark:border-gray-700
                            bg-white
                            dark:bg-gray-900
                            outline-none
                            focus:ring-2
                            focus:ring-pink-500
                        "
                    />

                    <select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        className="
                            px-5
                            py-3
                            rounded-xl
                            border
                            border-gray-200
                            dark:border-gray-700
                            bg-white
                            dark:bg-gray-900
                            outline-none
                        "
                    >

                        <option value="All">
                            All Categories
                        </option>

                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item}
                            </option>
                        ))}

                    </select>

                </div>

                {/* LOADING */}

                {loading && (
                    <p className="
                        text-center
                        py-20
                        text-gray-500
                    ">
                        Loading products...
                    </p>
                )}

                {/* ERROR */}

                {!loading && error && (
                    <p className="
                        text-center
                        py-20
                        text-red-500
                    ">
                        {error}
                    </p>
                )}

                {/* PRODUCTS */}

                {!loading &&
                    !error &&
                    filteredProducts.length > 0 && (

                    <div className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-6
                    ">

                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product._id}
                                product={product}
                            />
                        ))}

                    </div>
                )}

                {/* EMPTY */}

                {!loading &&
                    !error &&
                    filteredProducts.length === 0 && (

                    <div className="
                        text-center
                        py-20
                    ">
                        <h2 className="
                            text-2xl
                            font-bold
                        ">
                            No products found
                        </h2>

                        <p className="
                            text-gray-500
                            mt-2
                        ">
                            No approved products are available.
                        </p>
                    </div>
                )}

            </main>

        </div>
    );
};

export default Products;