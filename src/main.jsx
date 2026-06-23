import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from "./CartContext.jsx";
import ReactDOM from "react-dom/client";


ReactDOM.createRoot(document.getElementById("root")).render(
    <CartProvider>
        <App />
    </CartProvider>
)
