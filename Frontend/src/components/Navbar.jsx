import React, { useState } from 'react';
import { ShoppingCart, Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';

const Navbar = () => {
  const [showPages, setShowPages] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileShowPages, setMobileShowPages] = useState(false);
  const [mobileShowShop, setMobileShowShop] = useState(false);

  const vegetableList = [
    'Cauliflower', 'Papaya', 'Brinjal', 'Lady Finger',
    'Cabbage', 'Bottle Gourd', 'Bitter Gourd', 'Tomato',
    'Chilli', 'Capsicum', 'Watermelon', 'Muskmelon',
    'Cucumber', 'Small Cucumber', 'Drumstick', 'Merigold'
  ];

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
    setMobileShowPages(false);
    setMobileShowShop(false);
  };

  return (
    <nav className="bg-green-800 text-white px-6 py-5 relative z-20">
      <div className="flex items-center justify-between md:justify-start">
        <div className="text-xl font-bold mr-4">
          <img src={Logo} alt="Logo" className="w-30 h-13" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-10 items-center text-lg">
          <Link to="/" className="hover:text-yellow-200 font-semibold">Home</Link>

          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowShopDropdown(!showShopDropdown)}
              className="hover:text-yellow-200 font-semibold"
            >
              Shop ▾
            </button>
            {showShopDropdown && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white text-black rounded-xl shadow-2xl border z-10 w-100">
                <div className="grid grid-cols-2 gap-x-6 gap-y-2 px-4 py-3">
                  {vegetableList.map((veg, i) => (
                    <Link
                      key={i}
                      to={`/vegetable/${veg.toLowerCase().replace(/\s+/g, '-')}`}
                      className="hover:text-yellow-300 transition-all duration-200 font-semibold rounded-md"
                      onClick={() => setShowShopDropdown(false)}
                    >
                      {veg}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/team" className="hover:text-yellow-200 font-semibold">Team</Link>
          <Link to="/about-us" className="hover:text-yellow-200 font-semibold">About Us</Link>
          <Link to="/contact-us" className="hover:text-yellow-200 font-semibold">Contact us</Link>
          <Link to="/phases" className="hover:text-yellow-200 font-semibold">Phases</Link>

          {/* Pages Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPages(!showPages)}
              className="hover:text-yellow-200 font-semibold"
            >
              Pages ▾
            </button>
            {showPages && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white text-black rounded-xl shadow-2xl z-10 w-56">
                {/* <Link to="/delivery" className="block px-4 py-2 hover:text-yellow-300" onClick={() => setShowPages(false)}>Our Delivery</Link> */}
                <Link to="/infrastructure" className="block px-4 py-2 hover:text-yellow-300" onClick={() => setShowPages(false)}>Infrastructure</Link>
                <Link to="/my-orders" className="block px-4 py-2 hover:text-yellow-300" onClick={() => setShowPages(false)}>My Orders</Link>
              </div>
            )}
          </div>
        </div>

        {/* Right - Cart & Profile (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="hover:text-yellow-200">
            <ShoppingCart size={24} />
          </button>
          <Link to="/profile" className="hover:text-yellow-200" title="Profile">
            <User size={30} />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden ml-auto">
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-green-800 text-white transform transition-transform duration-300 z-30 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-green-600">
          <div className="text-xl font-bold">Menu</div>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X size={28} />
          </button>
        </div>

        <nav className="flex flex-col gap-4 px-6 mt-4 text-lg">
          <Link to="/" className="hover:text-yellow-200" onClick={handleMobileLinkClick}>Home</Link>

          {/* Mobile Shop */}
          <div>
            <button
              onClick={() => setMobileShowShop(!mobileShowShop)}
              className="w-full text-left hover:text-yellow-200 font-semibold flex justify-between items-center"
            >
              Shop ▾
            </button>
            {mobileShowShop && (
              <div className="mt-2 ml-4 grid grid-cols-2 gap-x-4 gap-y-2">
                {vegetableList.map((veg, i) => (
                  <Link
                    key={i}
                    to={`/vegetable/${veg.toLowerCase().replace(/\s+/g, '-')}`}
                    className="hover:text-yellow-200"
                    onClick={handleMobileLinkClick}
                  >
                    {veg}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/team" className="hover:text-yellow-200 font-semibold" onClick={handleMobileLinkClick}>Team</Link>
          <Link to="/about-us" className="hover:text-yellow-200 font-semibold" onClick={handleMobileLinkClick}>About Us</Link>
          <Link to="/contact-us" className="hover:text-yellow-200 font-semibold" onClick={handleMobileLinkClick}>Contact us</Link>
          <Link to="/phases" className="hover:text-yellow-200 font-semibold" onClick={handleMobileLinkClick}>Phases</Link>

          {/* Mobile Pages */}
          <div>
            <button
              onClick={() => setMobileShowPages(!mobileShowPages)}
              className="w-full text-left hover:text-yellow-200 font-semibold flex justify-between items-center"
            >
              Pages ▾
            </button>
            {mobileShowPages && (
              <div className="mt-2 ml-4 flex flex-col gap-2">
                {/* <Link to="/delivery" className="hover:text-yellow-200" onClick={handleMobileLinkClick}>Our Delivery</Link> */}
                <Link to="/infrastructure" className="hover:text-yellow-200" onClick={handleMobileLinkClick}>Infrastructure</Link>
                <Link to="/my-orders" className="hover:text-yellow-200" onClick={handleMobileLinkClick}>My Orders</Link>
              </div>
            )}
          </div>

          {/* Cart and Profile (Mobile) */}
          <div className="flex items-center gap-4 mt-6">
            <button className="hover:text-yellow-200">
              <ShoppingCart size={24} />
            </button>
            <Link to="/profile" className="hover:text-yellow-200" title="Profile">
              <User size={30} />
            </Link>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black opacity-50 z-10" onClick={() => setMobileMenuOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
