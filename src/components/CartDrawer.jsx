import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowRight, MapPin, User, Phone, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/menuData';
import { getUserLocation } from '../utils/location';

export default function CartDrawer() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    cartSubtotal,
    isCartOpen,
    setIsCartOpen,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    tableNumber,
    setTableNumber,
    logNewOrder,
  } = useCart();

  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCartOpen) return null;

  // Handle WhatsApp Checkout with Location Capture & Secret Admin Order Logging
  const handleCheckout = async () => {
    // 1. Validation
    if (!customerName.trim()) {
      setFormError('Please enter your Name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.trim().length < 10) {
      setFormError('Please enter a valid 10-digit Phone Number');
      return;
    }
    setFormError('');
    setIsSubmitting(true);

    // 2. Capture GPS Location silently
    const locationData = await getUserLocation();

    // 3. Log order into Admin Panel
    const loggedOrder = logNewOrder(locationData);

    // 4. Format WhatsApp Message
    const itemLines = cart.map((ci, idx) => {
      let line = `${idx + 1}. *${ci.name}*`;
      if (ci.sizeName) line += ` (${ci.sizeName})`;
      line += ` x${ci.quantity} - ₹${ci.unitPrice * ci.quantity}`;

      const addOnDetails = [];
      if (ci.stuffedCrust) addOnDetails.push(`   + Cheese Stuffed Crust (+₹${ci.crustPrice})`);
      if (ci.extraCheeseSlice) addOnDetails.push(`   + Extra Cheese Slice (+₹20)`);

      if (addOnDetails.length > 0) {
        line += '\n' + addOnDetails.join('\n');
      }
      return line;
    });

    const locationText = locationData.available
      ? `\n📍 *Exact Location:* ${locationData.mapsLink}`
      : '';

    const whatsappText = [
      `👋 *CHAPTER ONE CAFE ORDER (${loggedOrder.orderId})*`,
      `👤 *Name:* ${customerName.trim()}`,
      `📞 *Phone:* ${customerPhone.trim()}`,
      tableNumber.trim() ? `📍 *Table / Note:* ${tableNumber.trim()}` : null,
      locationText ? locationText.trim() : null,
      ``,
      `📋 *ORDERED ITEMS (${totalItemCount}):*`,
      itemLines.join('\n\n'),
      `-----------------------------`,
      `💰 *TOTAL AMOUNT: ₹${cartSubtotal}*`,
      `-----------------------------`,
      `Please confirm & prepare our order!`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    setIsSubmitting(false);

    // 5. Open WhatsApp & clear cart
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Cart Drawer Container */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden border border-gray-200 shadow-2xl z-10 my-0 sm:my-auto max-h-[92vh] flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-gray-50/80">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[#B8860B]">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1D1D1F] font-heading leading-none">
                  Your Order Basket
                </h2>
                <span className="text-xs text-secondaryText mt-0.5 block">
                  {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold px-2 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full bg-white border border-gray-200 text-[#1D1D1F] hover:text-[#B8860B] shadow-xs"
                aria-label="Close cart"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Body */}
          <div className="p-4 sm:p-5 overflow-y-auto flex-1 space-y-4">
            
            {cart.length === 0 ? (
              <div className="py-12 text-center">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">Your Basket is Empty</h3>
                <p className="text-xs text-secondaryText mb-4 max-w-xs mx-auto">
                  Browse our menu and add your favorite pizzas, burgers, momos & drinks.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#1D1D1F] text-white text-xs font-bold shadow-xs"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <>
                {/* Itemized List */}
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-xs">
                  {cart.map((ci) => (
                    <div key={ci.cartItemId} className="p-3.5 flex items-center justify-between gap-3">
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-bold text-[#1D1D1F] font-heading truncate">
                            {ci.name}
                          </span>
                        </div>

                        {ci.sizeName && (
                          <div className="text-[11px] text-[#B8860B] font-semibold">
                            Size: {ci.sizeName}
                          </div>
                        )}

                        {ci.stuffedCrust && (
                          <div className="text-[10px] text-secondaryText">
                            + Stuffed Crust (+₹{ci.crustPrice})
                          </div>
                        )}
                        {ci.extraCheeseSlice && (
                          <div className="text-[10px] text-secondaryText">
                            + Extra Cheese Slice (+₹20)
                          </div>
                        )}

                        <div className="text-xs font-extrabold text-[#1D1D1F] mt-1">
                          ₹{ci.unitPrice * ci.quantity}
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-xl border border-gray-200">
                          <button
                            onClick={() => updateQuantity(ci.cartItemId, -1)}
                            className="w-7 h-7 rounded-lg bg-white text-[#1D1D1F] flex items-center justify-center font-bold shadow-xs active:scale-95"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-[#1D1D1F] w-4 text-center">
                            {ci.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(ci.cartItemId, 1)}
                            className="w-7 h-7 rounded-lg bg-white text-[#1D1D1F] flex items-center justify-center font-bold shadow-xs active:scale-95"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(ci.cartItemId)}
                          className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* CUSTOMER DETAILS FORM (NAME & PHONE REQUIRED) */}
                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200/80 space-y-3">
                  <div className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>Customer Details (Required)</span>
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        placeholder="10-digit Phone"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1">
                      Table No. / Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 or Takeaway"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-secondaryText">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-semibold text-[#1D1D1F]">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-secondaryText">
                    <span>Taxes & Service</span>
                    <span className="font-semibold text-green-700">FREE</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-[#1D1D1F]">
                    <span>Total Amount</span>
                    <span className="text-[#B8860B]">₹{cartSubtotal}</span>
                  </div>
                </div>
              </>
            )}

          </div>

          {/* Sticky WhatsApp Order Button Footer */}
          {cart.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between gap-3 shadow-lg">
              <div>
                <div className="text-[10px] text-secondaryText uppercase tracking-wider font-bold">Total Payable</div>
                <div className="text-lg font-extrabold text-[#1D1D1F]">₹{cartSubtotal}</div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isSubmitting}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md active:scale-98 disabled:opacity-50 transition-all"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>{isSubmitting ? 'Locating & Processing...' : 'Place Order on WhatsApp'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
