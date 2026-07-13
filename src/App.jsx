
import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Footer from './components/Footer';
import OrderSucess from './Pages/OrderSucess';

function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div className="p-6">

        <main className="flex container mx-auto px-4 py-6">

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/productDetails' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/success" element={<OrderSucess />} />

          <Route path="/product/:id" element={<ProductDetails />} />

        </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>

  )

}

export default App;