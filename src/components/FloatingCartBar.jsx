import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowRight, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCartBar() {
  const { totalItemCount, promoEval, setIsCartOpen } = useCart();

  if (totalItemCount === 0) return null;

  return (
    <AnimatePresence>
      <div className="fixed bottom-4 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md z-40">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          onClick={() => setIsCartOpen(true)}
          className="bg-[#1D1D1F] text-white rounded-2xl shadow-2xl border border-gray-700 overflow-hidden cursor-pointer group active:scale-98 transition-transform"
        >
          {/* Real-time Smart "₹X Away" Banner */}
          {promoEval.primaryOffer && (
            <div className="bg-gradient-to-r from-amber-500/20 via-amber-600/30 to-amber-500/20 px-3.5 py-1.5 border-b border-amber-500/30 flex items-center justify-between text-[11px] font-bold text-amber-300">
              <div className="flex items-center gap-1.5 truncate">
                <Gift className="w-3.5 h-3.5 text-[#B8860B] flex-shrink-0" />
                <span className="truncate">{promoEval.primaryOffer.shortMessage}</span>
              </div>
              <span className="text-[10px] text-gray-300 font-semibold flex-shrink-0 ml-2">
                ₹{promoEval.paidSubtotal} / ₹{promoEval.primaryOffer.threshold}
              </span>
            </div>
          )}

          {/* Unlocked Notification Banner */}
          {(promoEval.mojitoUnlocked && !promoEval.hasFreeMojitoInCart) && (
            <div className="bg-gradient-to-r from-green-600/30 to-green-500/20 px-3.5 py-1.5 border-b border-green-500/30 text-[11px] font-bold text-green-400 flex items-center gap-1.5">
              <span>🍏</span>
              <span>FREE Green Apple Mojito Unlocked! Tap to Claim</span>
            </div>
          )}

          {(promoEval.coffeeUnlocked && !promoEval.hasFreeCoffeeInCart) && (
            <div className="bg-gradient-to-r from-green-600/30 to-green-500/20 px-3.5 py-1.5 border-b border-green-500/30 text-[11px] font-bold text-green-400 flex items-center gap-1.5">
              <span>☕</span>
              <span>FREE Cold Coffee Unlocked! Tap to Claim</span>
            </div>
          )}

          {/* Main Bar Content */}
          <div className="p-3.5 sm:px-5 flex items-center justify-between">
            {/* Left Count & Price */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#B8860B] flex items-center justify-center text-white relative flex-shrink-0">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#1D1D1F]">
                  {totalItemCount}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                  {totalItemCount} {totalItemCount === 1 ? 'ITEM' : 'ITEMS'} IN BASKET
                </div>
                <div className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>₹{promoEval.grandTotal}</span>
                  {promoEval.loyaltyDiscountAmount > 0 && (
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/20 px-1.5 py-0.2 rounded border border-green-500/30">
                      -12% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Action CTA */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#B8860B] group-hover:translate-x-1 transition-transform">
              <span>View Cart</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
