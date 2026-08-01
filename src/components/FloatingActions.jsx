import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { restaurantInfo } from '../data/menuData';

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent('Hi Chapter One Cafe, I would like to place an order or ask a question.')}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none">
      
      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-white border border-gray-200 text-[#1D1D1F] hover:text-[#B8860B] shadow-md pointer-events-auto active:scale-95 transition-all"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="p-3.5 rounded-full bg-green-600 text-white shadow-xl flex items-center justify-center pointer-events-auto relative group active:scale-95"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#B8860B] animate-ping"></span>
        <MessageCircle className="w-5 h-5 fill-white" />
        
        {/* Tooltip */}
        <span className="absolute right-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-[#1D1D1F] text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity border border-gray-700 shadow-sm pointer-events-none">
          WhatsApp Order
        </span>
      </motion.a>

    </div>
  );
}
