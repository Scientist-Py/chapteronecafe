import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus, MessageCircle, ArrowRight, User, Phone, AlertCircle, Volume2, ShieldCheck, Gift, Tag, Sparkles, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { restaurantInfo } from '../data/menuData';
import { speakThankYouAndRedirect } from '../utils/speech';
import { sanitizeInput, validatePhone, checkRateLimit } from '../utils/security';

export default function CartDrawer() {
  const {
    cart,
    addToCart,
    claimFreePromoItem,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItemCount,
    promoEval,
    applyLoyalty,
    setApplyLoyalty,
    setIsMondayPizzaModalOpen,
    isCartOpen,
    setIsCartOpen,
    customerName,
    setCustomerName,
    customerPhone,
    setCustomerPhone,
    tableNumber,
    setTableNumber,
    sendOrderToGoogleSheet,
  } = useCart();

  const [formError, setFormError] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  if (!isCartOpen) return null;

  // Handle Secure WhatsApp Order Checkout
  const handleCheckout = () => {
    // 1. Sanitize all customer inputs
    const cleanName = sanitizeInput(customerName);
    const cleanPhone = sanitizeInput(customerPhone).replace(/\D/g, '');
    const cleanTable = sanitizeInput(tableNumber);

    // 2. Strict Input Validation
    if (!cleanName || cleanName.length < 2) {
      setFormError('Please enter a valid Name (at least 2 characters)');
      return;
    }
    if (!validatePhone(cleanPhone)) {
      setFormError('Please enter a valid 10-digit Phone Number');
      return;
    }

    // 3. Anti-Spam Rate Limit Check
    if (!checkRateLimit(3000)) {
      setFormError('Please wait a moment before submitting order again');
      return;
    }

    setFormError('');

    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const dateFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    // 4. Format Itemized WhatsApp Message with Free Items & Discounts
    const itemLines = cart.map((ci, idx) => {
      let line = `${idx + 1}. *${sanitizeInput(ci.name)}*`;
      if (ci.sizeName) line += ` (${sanitizeInput(ci.sizeName)})`;

      if (ci.isFreePromo) {
        line += ` x${ci.quantity} - *FREE (${ci.promoLabel || 'Offer'})* [Regular ₹${ci.originalPrice}]`;
      } else {
        line += ` x${ci.quantity} - ₹${ci.unitPrice * ci.quantity}`;
      }

      const addOnDetails = [];
      if (ci.stuffedCrust) addOnDetails.push(`   + Cheese Stuffed Crust (+₹${ci.crustPrice})`);
      if (ci.extraCheeseSlice) addOnDetails.push(`   + Extra Cheese Slice (+₹20)`);

      if (addOnDetails.length > 0) {
        line += '\n' + addOnDetails.join('\n');
      }
      return line;
    });

    const tableStr = cleanTable ? `📍 *Table / Note:* ${cleanTable}\n` : '';
    const loyaltyStr = promoEval.loyaltyDiscountAmount > 0
      ? `\n🎉 *12% Loyalty Discount Applied:* -₹${promoEval.loyaltyDiscountAmount}`
      : '';

    const whatsappText = [
      `👋 *CHAPTER ONE CAFE ORDER* (${orderId})`,
      `👤 *Name:* ${cleanName}`,
      `📞 *Phone:* ${cleanPhone}`,
      tableStr ? tableStr.trim() : null,
      ``,
      `📋 *ORDERED ITEMS (${totalItemCount}):*`,
      itemLines.join('\n\n'),
      loyaltyStr ? loyaltyStr.trim() : null,
      `-----------------------------`,
      `💰 *FINAL PAYABLE TOTAL: ₹${promoEval.grandTotal}*`,
      `-----------------------------`,
      `Please confirm & prepare our order!`
    ].filter(Boolean).join('\n');

    const whatsappUrl = `https://wa.me/${restaurantInfo.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

    // 5. Log order to Google Sheets Webhook in background
    const orderPayload = {
      orderId,
      dateFormatted,
      customerName: cleanName,
      customerPhone: cleanPhone,
      tableNumber: cleanTable || 'Direct Order',
      items: cart,
      totalCount: totalItemCount,
      paidSubtotal: promoEval.paidSubtotal,
      loyaltyDiscount: promoEval.loyaltyDiscountAmount,
      totalAmount: promoEval.grandTotal,
    };
    sendOrderToGoogleSheet(orderPayload);

    // 6. Clear cart & Close drawer
    clearCart();
    setIsCartOpen(false);

    // 7. Play voice confirmation FIRST, then open WhatsApp when finished!
    speakThankYouAndRedirect(cleanName, whatsappUrl);
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
                {/* LIVE SMART PROMOTION PROGRESS & UNLOCKED CARDS */}
                <div className="space-y-2">
                  
                  {/* Monday Special Unlocked Banner */}
                  {promoEval.isMonday && (
                    <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-amber-50 border border-amber-300 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🍕</span>
                        <div>
                          <div className="font-extrabold text-[#1D1D1F]">Monday Offer</div>
                          <div className="text-[11px] text-secondaryText">
                            {promoEval.hasFreeMondayPizzaInCart
                              ? 'Free Medium Pizza Claimed!'
                              : promoEval.isMondayQualified
                              ? '🎉 Free Medium Pizza Unlocked!'
                              : 'Add 1 Large Pizza to get 1 Medium FREE'}
                          </div>
                        </div>
                      </div>

                      {promoEval.isMondayQualified && !promoEval.hasFreeMondayPizzaInCart && (
                        <button
                          onClick={() => setIsMondayPizzaModalOpen(true)}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 text-white text-[10px] font-extrabold shadow-xs hover:bg-amber-600 transition-all flex items-center gap-1"
                        >
                          <span>Choose Free Pizza</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* Smart "₹X Away" Banner & Progress Indicator */}
                  {promoEval.primaryOffer && (
                    <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-[#1D1D1F] flex items-center gap-1.5">
                          <Gift className="w-4 h-4 text-[#B8860B]" />
                          <span>{promoEval.primaryOffer.message}</span>
                        </div>
                        <span className="text-[10px] font-extrabold text-[#B8860B] bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                          ₹{promoEval.paidSubtotal} / ₹{promoEval.primaryOffer.threshold}
                        </span>
                      </div>

                      {/* Live Progress Bar */}
                      <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-amber-200/80">
                        <div
                          className="h-full bg-[#B8860B] rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, promoEval.primaryOffer.progress * 100)}%` }}
                        />
                      </div>

                      {/* SMART PRODUCT SUGGESTIONS (Add something for ₹X+) */}
                      {promoEval.smartSuggestions.length > 0 && (
                        <div className="pt-2 border-t border-amber-200/60 space-y-1.5">
                          <div className="text-[10px] font-extrabold uppercase text-[#1D1D1F]">
                            Add something for ₹{promoEval.primaryOffer.needed}+ to unlock:
                          </div>
                          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                            {promoEval.smartSuggestions.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => addToCart(item)}
                                className="flex items-center gap-1.5 p-1.5 pr-2.5 rounded-xl bg-white border border-amber-200 shadow-xs hover:border-[#B8860B] transition-all flex-shrink-0 active:scale-95"
                              >
                                <img src={item.image} alt={item.name} className="w-6 h-6 rounded-lg object-cover" />
                                <div className="text-left">
                                  <div className="text-[10px] font-bold text-[#1D1D1F] line-clamp-1">{item.name}</div>
                                  <div className="text-[9px] font-extrabold text-[#B8860B]">₹{item.price}</div>
                                </div>
                                <span className="text-[10px] font-extrabold text-green-700 bg-green-50 px-1.5 py-0.2 rounded border border-green-200 ml-1">
                                  + Add
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Claim Free Mojito Button */}
                  {promoEval.mojitoUnlocked && !promoEval.hasFreeMojitoInCart && (
                    <div className="p-3 rounded-2xl bg-green-50 border border-green-200 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🍏</span>
                        <div>
                          <div className="font-extrabold text-green-900">Offer Unlocked!</div>
                          <div className="text-[11px] text-green-700">FREE Green Apple Mojito</div>
                        </div>
                      </div>
                      <button
                        onClick={() => claimFreePromoItem('MOJITO_399')}
                        className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-[10px] font-extrabold shadow-xs transition-all flex items-center gap-1"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Add Free Mojito</span>
                      </button>
                    </div>
                  )}

                  {/* Claim Free Coffee Button */}
                  {promoEval.coffeeUnlocked && !promoEval.hasFreeCoffeeInCart && (
                    <div className="p-3 rounded-2xl bg-green-50 border border-green-200 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">☕</span>
                        <div>
                          <div className="font-extrabold text-green-900">Offer Unlocked!</div>
                          <div className="text-[11px] text-green-700">FREE Cold Coffee</div>
                        </div>
                      </div>
                      <button
                        onClick={() => claimFreePromoItem('COFFEE_599')}
                        className="px-3 py-1.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-[10px] font-extrabold shadow-xs transition-all flex items-center gap-1"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Add Free Coffee</span>
                      </button>
                    </div>
                  )}

                </div>

                {/* Itemized List */}
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-xs">
                  {cart.map((ci) => (
                    <div key={ci.cartItemId} className={`p-3.5 flex items-center justify-between gap-3 ${ci.isFreePromo ? 'bg-amber-50/40' : ''}`}>
                      
                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-xs font-bold text-[#1D1D1F] font-heading truncate">
                            {ci.name}
                          </span>
                          {ci.isFreePromo && (
                            <span className="px-2 py-0.2 rounded bg-green-600 text-white text-[9px] font-extrabold">
                              {ci.promoLabel || 'FREE — Offer'}
                            </span>
                          )}
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

                        {/* Price rendering for Free vs Paid */}
                        <div className="text-xs font-extrabold mt-1 flex items-center gap-2">
                          {ci.isFreePromo ? (
                            <>
                              <span className="line-through text-gray-400 font-semibold">₹{ci.originalPrice}</span>
                              <span className="text-green-600 font-extrabold">₹0 (FREE — Offer)</span>
                            </>
                          ) : (
                            <span className="text-[#1D1D1F]">₹{ci.unitPrice * ci.quantity}</span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Stepper / Remove */}
                      <div className="flex items-center gap-2">
                        {!ci.isFreePromo ? (
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
                        ) : (
                          <span className="text-xs font-extrabold text-green-700 bg-green-50 px-2 py-1 rounded-lg border border-green-200">
                            1 FREE
                          </span>
                        )}

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

                {/* SECURE CUSTOMER DETAILS FORM */}
                <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-2xl p-4 border border-gray-200/90 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-[#1D1D1F] uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#B8860B]" />
                      <span>Customer Details</span>
                    </div>
                    <span className="text-[10px] text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full border border-green-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-600" />
                      <span>256-Bit Encrypted</span>
                    </span>
                  </div>

                  {formError && (
                    <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Name Input */}
                  <div>
                    <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1 flex items-center justify-between">
                      <span>Full Name *</span>
                      {customerName && <span className="text-green-700 font-semibold lowercase">✓ typed</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. Tushar"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#1D1D1F] font-medium transition-all shadow-xs ${
                          focusedField === 'name'
                            ? 'border-2 border-[#B8860B] ring-2 ring-[#B8860B]/20 bg-amber-50/30'
                            : 'border border-gray-200'
                        }`}
                        maxLength={40}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1 flex items-center justify-between">
                      <span>Phone Number *</span>
                      {customerPhone && (
                        <span className="text-[#B8860B] font-bold">
                          Live: {customerPhone}
                        </span>
                      )}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        onFocus={() => setFocusedField('phone')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="e.g. 9758781006"
                        className={`w-full px-3.5 py-2.5 rounded-xl bg-white text-xs text-[#1D1D1F] font-bold tracking-wide transition-all shadow-xs ${
                          focusedField === 'phone'
                            ? 'border-2 border-[#B8860B] ring-2 ring-[#B8860B]/20 bg-amber-50/30 text-[#1D1D1F]'
                            : 'border border-gray-200'
                        }`}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  {/* Table / Note Input */}
                  <div>
                    <label className="text-[10px] text-secondaryText font-bold uppercase block mb-1">
                      Table No. / Note (Optional)
                    </label>
                    <input
                      type="text"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="e.g. Table 4 or Dine-in"
                      maxLength={50}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs text-[#1D1D1F] focus:outline-none focus:border-[#B8860B]"
                    />
                  </div>
                </div>

                {/* Bill Breakdown with Offers & Discounts */}
                <div className="bg-gray-50 rounded-2xl p-3.5 border border-gray-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-secondaryText">
                    <span>Subtotal ({totalItemCount} items)</span>
                    <span className="font-semibold text-[#1D1D1F]">₹{promoEval.paidSubtotal}</span>
                  </div>

                  {promoEval.loyaltyDiscountAmount > 0 && (
                    <div className="flex justify-between text-green-700 font-bold">
                      <span className="flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Loyalty Reward (12% OFF)</span>
                      </span>
                      <span>-₹{promoEval.loyaltyDiscountAmount}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-secondaryText">
                    <span>Taxes & Service</span>
                    <span className="font-semibold text-green-700">FREE</span>
                  </div>

                  <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-extrabold text-[#1D1D1F]">
                    <span>Final Payable Total</span>
                    <span className="text-[#B8860B]">₹{promoEval.grandTotal}</span>
                  </div>
                </div>

                {/* Checkout Offer Summary Header */}
                <div className="text-[11px] font-bold text-gray-500 flex items-center gap-1 px-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Your active offers & free rewards will be included on WhatsApp</span>
                </div>
              </>
            )}

          </div>

          {/* Sticky WhatsApp Order Button Footer */}
          {cart.length > 0 && (
            <div className="p-4 bg-[#FFFFFF] border-t border-gray-200 flex items-center justify-between gap-3 shadow-lg">
              <div>
                <div className="text-[10px] text-secondaryText uppercase tracking-wider font-bold">Total Payable</div>
                <div className="text-lg font-extrabold text-[#1D1D1F]">₹{promoEval.grandTotal}</div>
              </div>

              <button
                onClick={handleCheckout}
                className="flex-1 py-3.5 px-4 rounded-xl font-bold bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md active:scale-98 transition-all"
              >
                <MessageCircle className="w-4.5 h-4.5" />
                <span>Place Order on WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
