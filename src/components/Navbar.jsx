import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu as MenuIcon, X, MapPin, Sparkles, ShoppingBag } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { totalItemCount, setIsCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'glass-nav py-3 shadow-apple-light' : 'bg-[#FAFAFA]/90 backdrop-blur-md py-4'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <img 
            src="/logo.jpg" 
            alt="Chapter One Cafe" 
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#1D1D1F] block leading-tight font-heading group-hover:text-[#B8860B] transition-colors">
              CHAPTER ONE <span className="text-[#B8860B]">CAFE</span>
            </span>
            <span className="text-[10px] text-secondaryText tracking-wider uppercase block -mt-0.5 font-medium">
              Baghpat, UP
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs font-semibold text-[#1D1D1F] hover:text-[#B8860B] transition-colors py-1 relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#B8860B] transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Desktop Call & Cart Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold bg-[#1D1D1F] text-white hover:bg-[#B8860B] transition-all duration-200 shadow-xs relative"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Basket</span>
            {totalItemCount > 0 && (
              <span className="bg-red-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                {totalItemCount}
              </span>
            )}
          </button>

          <a
            href={`tel:${restaurantInfo.phone}`}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold bg-white text-[#1D1D1F] border border-gray-200 hover:border-[#B8860B] hover:text-[#B8860B] transition-all duration-200 shadow-xs"
          >
            <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>{restaurantInfo.phoneFormatted}</span>
          </a>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-2">
          {/* Mobile Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-2 rounded-full bg-[#1D1D1F] text-white shadow-xs relative active:scale-95 transition-transform"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 text-[#B8860B]" />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                {totalItemCount}
              </span>
            )}
          </button>

          <a
            href={`tel:${restaurantInfo.phone}`}
            className="p-2 rounded-full bg-white border border-gray-200 text-[#B8860B] shadow-xs active:scale-95 transition-transform"
            aria-label="Call Us"
          >
            <Phone className="w-4 h-4" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-white border border-gray-200 text-[#1D1D1F] shadow-xs focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#B8860B]" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="px-5 py-5 space-y-3 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-[#1D1D1F] hover:text-[#B8860B] py-2 border-b border-gray-100 flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#B8860B]/40" />
                </a>
              ))}
              
              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => { setMobileMenuOpen(false); setIsCartOpen(true); }}
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold bg-[#1D1D1F] text-white text-xs shadow-xs"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>View Order Basket ({totalItemCount} items)</span>
                </button>

                <a
                  href={`tel:${restaurantInfo.phone}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-full font-bold bg-[#B8860B] text-white text-xs shadow-xs"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call to Order ({restaurantInfo.phone})</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
