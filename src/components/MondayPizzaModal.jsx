import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pizza, Check, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuItemsData } from '../data/menuData';

export default function MondayPizzaModal() {
  const {
    isMondayPizzaModalOpen,
    setIsMondayPizzaModalOpen,
    claimFreeMondayPizza,
  } = useCart();

  if (!isMondayPizzaModalOpen) return null;

  // Filter existing pizzas that offer Medium (10") size
  const mediumPizzaOptions = menuItemsData.filter(
    (item) => item.category === 'Pizza' && item.hasSizes && item.sizes && item.sizes.some(s => s.name.includes('Medium'))
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsMondayPizzaModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-2xl z-10 my-0 sm:my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-amber-50 to-white">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-extrabold shadow-sm">
                🍕
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#1D1D1F] font-heading leading-tight">
                  Choose Your FREE Medium Pizza
                </h3>
                <span className="text-xs text-[#B8860B] font-semibold">
                  Monday Special • 100% FREE (Value up to ₹379)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsMondayPizzaModalOpen(false)}
              className="p-1.5 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-black shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* List of Medium Pizzas */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-3 flex-1">
            {mediumPizzaOptions.map((pizza) => (
              <div
                key={pizza.id}
                onClick={() => claimFreeMondayPizza(pizza)}
                className="bg-white rounded-2xl border border-gray-200 p-3.5 flex items-center justify-between gap-3 hover:border-amber-400 hover:bg-amber-50/40 transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-100 flex-shrink-0"
                  />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#1D1D1F] font-heading group-hover:text-[#B8860B] transition-colors">
                      {pizza.name} (Medium 10")
                    </h4>
                    <p className="text-[11px] text-secondaryText line-clamp-1 mt-0.5">
                      {pizza.description}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs line-through text-gray-400 font-semibold">₹349</span>
                      <span className="text-xs font-extrabold text-green-600 bg-green-50 px-2 py-0.2 rounded border border-green-200">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    claimFreeMondayPizza(pizza);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-[#1D1D1F] text-white hover:bg-amber-600 font-bold text-xs shadow-xs transition-all flex items-center gap-1 whitespace-nowrap"
                >
                  <Gift className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Select</span>
                </button>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
