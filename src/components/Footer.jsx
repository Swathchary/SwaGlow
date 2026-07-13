export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              SwaGlow
            </h2>
            <p className="text-sm">
              Your one-stop destination for quality products at
              affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white">
                  Products
                </a>
              </li>
              {/* <li>
                <a href="/cart" className="hover:text-white">
                  Cart
                </a>
              </li> */}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              {/* <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping Policy
                </a>
              </li> */}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3">
              Subscribe
            </h3>
            <p className="text-sm mb-3">
              Get updates on new arrivals and offers.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 rounded-l-md text-black bg-white outline-none"
              />
              <button className="bg-blue-600 px-4 rounded-r-md hover:bg-blue-700 text-white">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm">
          © {new Date().getFullYear()} SwaGlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
}