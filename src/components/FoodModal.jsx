import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Utensils, CheckCircle2, Plus, Minus, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FoodModal({ item, onClose }) {
  if (!item) return null;

  const { addToCart } = useCart();

  // Selected Size state
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [extraCheeseSlice, setExtraCheeseSlice] = useState(false);
  const [stuffedCrust, setStuffedCrust] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Reset state when item changes
  useEffect(() => {
    setSelectedSizeIndex(0);
    setExtraCheeseSlice(false);
    setStuffedCrust(false);
    setQuantity(1);
  }, [item]);

  // Calculate Base Price
  const basePrice = item.hasSizes && item.sizes && item.sizes[selectedSizeIndex]
    ? item.sizes[selectedSizeIndex].price
    : item.price;

  // Calculate Add-on Prices
  const stuffedCrustPrices = [40, 60, 80];
  const crustAddonPrice = stuffedCrust ? (stuffedCrustPrices[selectedSizeIndex] || 40) : 0;
  const cheeseSliceAddonPrice = extraCheeseSlice ? 20 : 0;

  // Total Unit Price & Total Price
  const unitPrice = basePrice + crustAddonPrice + cheeseSliceAddonPrice;
  const totalPrice = unitPrice * quantity;

  // Chosen Size Option
  const selectedSizeOpt = item.hasSizes && item.sizes && item.sizes[selectedSizeIndex]
    ? item.sizes[selectedSizeIndex]
    : null;

  // Handle Add To Cart & Close
  const handleAddToCart = () => {
    addToCart(item, selectedSizeOpt, stuffedCrust, extraCheeseSlice, quantity);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 320 }}
          className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-2xl z-10 my-0 sm:my-auto max-h-[92vh] flex flex-col justify-between"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 border border-gray-200 text-[#1D1D1F] hover:text-[#B8860B] shadow-sm transition-all"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="overflow-y-auto">
            {/* Header Image Container (Full Uncropped Image View) */}
            <div className="relative h-60 sm:h-72 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center overflow-hidden p-3">
              {item.image ? (
                <>
                  {/* Subtle Ambient Blurred Background */}
                  <img
                    src={item.image}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                    loading="eager"
                    decoding="async"
                  />
                  {/* Full 100% Uncropped Food Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="relative z-10 max-h-full max-w-full object-contain drop-shadow-2xl rounded-xl"
                    loading="eager"
                    decoding="async"
                  />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-gray-100 to-gray-50 flex flex-col items-center justify-center text-center p-5">
                  <Utensils className="w-8 h-8 text-[#B8860B] mb-1" />
                  <span className="text-xs font-medium text-secondaryText">Freshly Prepared Dish</span>
                </div>
              )}

              {/* Veg Indicator */}
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-white/95 border border-green-600/40 text-green-700 text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <CheckCircle2 className="w-3 h-3 text-green-600" />
                <span>Pure Vegetarian</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-5">
              
              <div>
                <span className="text-[10px] font-bold tracking-widest text-[#B8860B] uppercase">
                  {item.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1D1D1F] font-heading leading-tight mt-0.5">
                  {item.name}
                </h2>
                <p className="text-xs text-secondaryText leading-relaxed mt-1">
                  {item.description}
                </p>
              </div>

              {/* SIZE VARIANT SELECTION (REGULAR, MEDIUM, LARGE) */}
              {item.hasSizes && item.sizes && (
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                      Select Size Variant
                    </label>
                    <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {item.sizes.map((sizeOpt, idx) => {
                      const isSelected = selectedSizeIndex === idx;
                      return (
                        <button
                          key={sizeOpt.name}
                          type="button"
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`p-3 rounded-xl border text-center transition-all relative ${
                            isSelected
                              ? 'border-[#B8860B] bg-amber-50/80 text-[#1D1D1F] shadow-sm font-bold'
                              : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#B8860B] text-white flex items-center justify-center">
                              <Check className="w-2.5 h-2.5" />
                            </div>
                          )}
                          <div className="text-xs font-bold">{sizeOpt.name}</div>
                          <div className="text-xs font-extrabold text-[#B8860B] mt-1">₹{sizeOpt.price}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CHEESE & CRUST ADD-ONS */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <label className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider block">
                  Add-on Options
                </label>

                {item.category === "Pizza" && (
                  <button
                    type="button"
                    onClick={() => setStuffedCrust(!stuffedCrust)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                      stuffedCrust
                        ? 'border-[#B8860B] bg-amber-50/80 text-[#1D1D1F]'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 text-xs font-semibold">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${stuffedCrust ? 'bg-[#B8860B] border-[#B8860B] text-white' : 'border-gray-300'}`}>
                        {stuffedCrust && <Check className="w-3 h-3" />}
                      </div>
                      <span>Extra Cheese Stuffed Crust</span>
                    </div>
                    <span className="text-xs font-bold text-[#B8860B]">
                      + ₹{stuffedCrustPrices[selectedSizeIndex] || 40}
                    </span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setExtraCheeseSlice(!extraCheeseSlice)}
                  className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                    extraCheeseSlice
                      ? 'border-[#B8860B] bg-amber-50/80 text-[#1D1D1F]'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${extraCheeseSlice ? 'bg-[#B8860B] border-[#B8860B] text-white' : 'border-gray-300'}`}>
                      {extraCheeseSlice && <Check className="w-3 h-3" />}
                    </div>
                    <span>Extra Cheese Slice</span>
                  </div>
                  <span className="text-xs font-bold text-[#B8860B]">+ ₹20</span>
                </button>
              </div>

              {/* QUANTITY SELECTOR */}
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center gap-3 bg-gray-100 p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg bg-white text-[#1D1D1F] flex items-center justify-center font-bold shadow-xs active:scale-95 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-extrabold text-[#1D1D1F] w-5 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg bg-white text-[#1D1D1F] flex items-center justify-center font-bold shadow-xs active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* SINGLE CLEAR ACTION: ADD TO CART */}
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={handleAddToCart}
              className="w-full py-3.5 px-5 rounded-2xl font-bold bg-[#1D1D1F] text-white hover:bg-[#B8860B] flex items-center justify-between shadow-md active:scale-98 transition-all"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4.5 h-4.5 text-[#B8860B]" />
                <span className="text-sm">Add Item to Cart</span>
              </div>
              <span className="text-sm font-extrabold bg-white/20 px-3 py-1 rounded-lg">
                ₹{totalPrice}
              </span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
