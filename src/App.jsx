
import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import About from './Pages/About';
import Contacts from './Pages/contacts';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import ProductDetails from './Pages/ProductDetails';
import Products from './Pages/Products';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';
import Footer from './components/Footer';



function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <div className="p-6">

        <main className="flex container mx-auto px-4 py-6">

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path='/productDetails' element={<ProductDetails />} />
          <Route path='/products' element={<Products />} />
          <Route path='/profile' element={<Profile />} />
            <Route path="*" element={<NotFound />} />

        </Routes>
        </main>

        <Footer />

      </div>
    </BrowserRouter>

  )

}

export default App;