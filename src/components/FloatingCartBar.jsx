import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCartBar() {
  const { totalItemCount, cartSubtotal, setIsCartOpen } = useCart();

  if (totalItemCount === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={() => setIsCartOpen(true)}
          className="bg-[#1D1D1F] text-white p-3.5 sm:px-5 rounded-2xl shadow-2xl border border-gray-700 flex items-center justify-between cursor-pointer group active:scale-98 transition-transform"
        >
          {/* Left Count & Price */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#B8860B] flex items-center justify-center text-white relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1D1D1F]">
                {totalItemCount}
              </span>
            </div>
            <div>
              <div className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'} ADDED
              </div>
              <div className="text-base font-extrabold text-white">
                ₹{cartSubtotal}
              </div>
            </div>
          </div>

          {/* Right Action CTA */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#B8860B] group-hover:translate-x-1 transition-transform">
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
