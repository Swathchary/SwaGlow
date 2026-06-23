import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../CartContext";

const Navbar = () => {

    const { cart } = useContext(CartContext);

    return (

        <nav className="sticky top-0 z-50 bg-white shadow-md px-6 py-4 flex justify-between items-center">
            <h1 className="text-3xl font-black tracking-wider">
                <span className="text-pink-500">Swa</span>
                <span className="text-purple-600">Glow</span>
            </h1>
            <div className="flex gap-6">
                <NavLink to='/'> Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/cart" className="relative">
                    🛒 Cart
          <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {cart.length}
                    </span>
                </NavLink>
            </div>

        </nav>
    )

}

export default Navbar;