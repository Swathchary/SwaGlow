import { useEffect, useState } from 'react'
import axios from 'axios'

const FetchProductsAPi = () => {


    const [productssetted, setAllProducts] = useState([])
    const [loading, setloading] = useState(true)
    const [error, setError] = ("")

    useEffect(() => {

        console.log("Entered Herre UseEffect")

        callProducts();

    }, []);


    const callProducts = async () => {

        try {

            const response = await axios.get("http://localhost:5000/swaglow/ToGetProducts");

            console.log("prosss", response);

            setAllProducts(response.data.data);

        } catch (error) {
            console.log("erorssss", error)
            setError("Failed to fetch")
        } finally {
            setloading(false);
        }
    }

    return (

        <div>
            <h1> Fetch Example </h1>

            {loading && <p> Loading.. PLease wait </p>}

            {error && <p> {error}</p>}

            {!loading && !error && productssetted.length == 0 &&

                (<p>No Products Found </p>)

            }

           {!loading && !error &&  productssetted.length > 0 && (

            <ul>
                {productssetted.map((products) => (

                    <li key={products._id}>

                       <h3> {products.category} </h3>
                
                        <p>{products.SubTitle}</p>

                    </li>
                )
                )}
            </ul>
            )}
        </div>
    )

}
export default FetchProductsAPi;