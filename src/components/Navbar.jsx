
import { NavLink } from "react-router-dom";


const Navbar = () => {

    return (

        <nav className="flex justify-between items-center p-4 shadow">
            <h1 className="text-3xl font-black tracking-wider">
                <span className="text-pink-500">Swa</span>
                <span className="text-purple-600">Glow</span>
            </h1>

            <div className="flex gap-6">
                <NavLink to='/'> Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/cart">Cart</NavLink>

            </div>

        </nav>
    )

}

export default Navbar;