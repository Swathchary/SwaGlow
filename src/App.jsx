import React from "react";
import "./App.css";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import DashboardLayout from "./components/DashboardLayout";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";


import CustomerDashboard from "./Pages/CustomerDashboard";

import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import ProductDetails from "./Pages/ProductDetails";
import Products from "./Pages/Products";
import Profile from "./Pages/Profile";
import OrderSucess from "./Pages/OrderSucess";

import CustomerLayout from "./components/CustomerLayout";


// Admin
import AdminDashboard from "./Pages/AdminDashboard";
import AdminProducts from "./Pages/AdminProducts";
import CreateSalesperson from "./Pages/CreateSalesperson";

// Salesperson
import SalesDashboard from "./Pages/SalesDashboard";
import SalesAddProduct from "./Pages/SalesAddProduct";
import SalesProducts from "./Pages/SalesProducts";

// Login/Register
import Login from "./Pages/Login";
import Register from "./Pages/Register";

import RequireRole from "./components/RequireRole";

import TestPayment from "./Pages/TestPayment";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* 
                    FIRST PAGE
                 */}

                {/* <Route
                    path="/"
                    element={<Navigate to="/login" replace />}
                /> */}


                {/* 
                    AUTH PAGES
                 */}

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* =========================
                    PUBLIC WEBSITE
                ========================== */}

                <Route
                    path="/home"
                    element={
                        <>
                            <Navbar />
                            <Home />
                            <Footer />
                        </>
                    }
                />


                <Route
                    path="/about"
                    element={
                        <>
                            <Navbar />
                            <About />
                            <Footer />
                        </>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <>
                            <Navbar />
                            <Contact />
                            <Footer />
                        </>
                    }
                />



                {/* =========================
                    ADMIN
                ========================== */}

                <Route path="/admin">
                    <Route index element={<AdminDashboard />} />
                    <Route path="products" element={<AdminProducts />} />
                    <Route
                        path="create-salesperson"
                        element={<CreateSalesperson />}
                    />
                </Route>

                {/* =========================
                    SALESPERSON
                ========================== */}

                <Route path="/sales" element={<SalesDashboard />} />
                <Route
                    path="/sales/add-product"
                    element={<SalesAddProduct />}
                />
                <Route
                    path="/sales/products"
                    element={<SalesProducts />}
                />


                {/* CUSTOMER*/}
                <Route
                    path="/customer"
                    element={<RequireRole role="customer" />}
                >
                    <Route element={<CustomerLayout />}>
                        <Route
                            index
                            element={<CustomerDashboard />}
                        />

                        <Route
                            path="products"
                            element={<Products />}
                        />

                        <Route
                            path="products/:id"
                            element={<ProductDetails />}
                        />

                        <Route
                            path="cart"
                            element={<Cart />}
                        />

                        <Route
                            path="checkout"
                            element={<Checkout />}
                        />
                        <Route
                            path="testpayment"
                            element={<TestPayment />}
                        />

                        <Route
                            path="profile"
                            element={<Profile />}
                        />

                        <Route
                            path="OrderSucess"
                            element={<OrderSucess />} />


                    </Route>
                </Route>

                {/*  INVALID URL*/}

                <Route
                    path="*"
                    element={
                        <>
                            <Navbar />
                            <NotFound />
                            <Footer />
                        </>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;