import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ToastNotification() {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 w-full max-w-sm pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 350 }}
            className="bg-[#1D1D1F] text-white px-4 py-3 rounded-2xl shadow-2xl border border-gray-700 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-green-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white leading-snug truncate">
                {toast.message}
              </div>
              <div className="text-[10px] text-gray-400">
                Item added to your basket
              </div>
            </div>

            <div className="text-[#B8860B] text-xs font-bold flex items-center gap-1">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
