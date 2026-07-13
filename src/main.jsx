import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./CartContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <App />
    </CartProvider>
)
