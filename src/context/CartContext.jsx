import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { playAddSound } from '../utils/sound';
import { restaurantInfo, menuItemsData } from '../data/menuData';
import {
  evaluatePromotions,
  OFFERS,
  checkMondayPizzaQualification,
  getEligiblePaidSubtotal,
} from '../utils/promotionsEngine';

const CartContext = createContext();

export function CartProvider({ children }) {
  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('chapter_one_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Customer details
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('chapter_one_cname') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('chapter_one_cphone') || '');
  const [tableNumber, setTableNumber] = useState('');

  // Promotions & Loyalty state
  const [applyLoyalty, setApplyLoyalty] = useState(true);
  const [isMondayPizzaModalOpen, setIsMondayPizzaModalOpen] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Save cart & customer details to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chapter_one_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      if (customerName) localStorage.setItem('chapter_one_cname', customerName);
      if (customerPhone) localStorage.setItem('chapter_one_cphone', customerPhone);
    } catch (e) {}
  }, [customerName, customerPhone]);

  // Real-Time Promotion Evaluation
  const promoEval = useMemo(() => {
    return evaluatePromotions(cart, menuItemsData, applyLoyalty);
  }, [cart, applyLoyalty]);

  // AUTOMATIC REWARD SANITY CLEANUP:
  // If paid subtotal drops below thresholds (e.g. user removes paid items), automatically revoke unearned free items!
  useEffect(() => {
    setCart((prevCart) => {
      const paidSubtotal = getEligiblePaidSubtotal(prevCart);
      let updated = [...prevCart];
      let changed = false;

      // Check ₹399 Mojito
      if (paidSubtotal < OFFERS.MOJITO_399.threshold) {
        const hasMojito = updated.some(i => i.isFreePromo && i.promoId === OFFERS.MOJITO_399.id);
        if (hasMojito) {
          updated = updated.filter(i => !(i.isFreePromo && i.promoId === OFFERS.MOJITO_399.id));
          changed = true;
        }
      }

      // Check ₹599 Coffee
      if (paidSubtotal < OFFERS.COFFEE_599.threshold) {
        const hasCoffee = updated.some(i => i.isFreePromo && i.promoId === OFFERS.COFFEE_599.id);
        if (hasCoffee) {
          updated = updated.filter(i => !(i.isFreePromo && i.promoId === OFFERS.COFFEE_599.id));
          changed = true;
        }
      }

      // Check Monday Pizza
      const mondayQualified = checkMondayPizzaQualification(prevCart);
      if (!mondayQualified) {
        const hasMondayPizza = updated.some(i => i.isFreePromo && i.promoId === OFFERS.MONDAY_PIZZA.id);
        if (hasMondayPizza) {
          updated = updated.filter(i => !(i.isFreePromo && i.promoId === OFFERS.MONDAY_PIZZA.id));
          changed = true;
        }
      }

      return changed ? updated : prevCart;
    });
  }, [cart]);

  // Show toast notification
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  };

  // Add Item to Cart (Normal Paid Item)
  const addToCart = (item, sizeOption = null, stuffedCrust = false, extraCheeseSlice = false, quantity = 1) => {
    const sizeName = sizeOption ? sizeOption.name : '';
    const basePrice = sizeOption ? sizeOption.price : item.price;
    
    // Calculate add-on costs
    const sizeIndex = sizeOption && item.sizes ? item.sizes.findIndex(s => s.name === sizeOption.name) : 0;
    const crustPrices = [40, 60, 80];
    const crustPrice = stuffedCrust ? (crustPrices[sizeIndex >= 0 ? sizeIndex : 0] || 40) : 0;
    const cheeseSlicePrice = extraCheeseSlice ? 20 : 0;
    
    const unitPrice = basePrice + crustPrice + cheeseSlicePrice;
    
    // Unique item key
    const cartItemId = `${item.id}_${sizeName}_${stuffedCrust ? 'crust' : ''}_${extraCheeseSlice ? 'slice' : ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((ci) => ci.cartItemId === cartItemId && !ci.isFreePromo);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            id: item.id,
            name: item.name,
            category: item.category,
            image: item.image,
            sizeName,
            stuffedCrust,
            crustPrice,
            extraCheeseSlice,
            cheeseSlicePrice,
            unitPrice,
            originalPrice: unitPrice,
            quantity,
            isFreePromo: false,
          },
        ];
      }
    });

    // Sound & Toast
    playAddSound();
    const sizeStr = sizeName ? ` (${sizeName})` : '';
    triggerToast(`Added ${item.name}${sizeStr} to Basket!`);
  };

  // CLAIM FREE PROMO ITEM (₹399 Mojito or ₹599 Coffee)
  const claimFreePromoItem = (offerKey) => {
    const offer = OFFERS[offerKey];
    if (!offer) return;

    // Prevent duplicate claims
    const existing = cart.find(i => i.isFreePromo && i.promoId === offer.id);
    if (existing) {
      triggerToast(`${offer.targetItemSearch} is already in your basket!`);
      return;
    }

    // Find target product in database
    const targetDish = menuItemsData.find(m => m.name.toLowerCase().includes(offer.targetItemSearch.toLowerCase()));
    if (!targetDish) return;

    const cartItemId = `FREE_PROMO_${offer.id}`;
    const freeItemPayload = {
      cartItemId,
      id: targetDish.id,
      name: targetDish.name,
      category: targetDish.category,
      image: targetDish.image,
      sizeName: '',
      stuffedCrust: false,
      crustPrice: 0,
      extraCheeseSlice: false,
      cheeseSlicePrice: 0,
      unitPrice: 0,
      originalPrice: targetDish.price,
      quantity: 1,
      isFreePromo: true,
      promoId: offer.id,
      promoLabel: 'FREE — Offer',
    };

    setCart(prev => [...prev, freeItemPayload]);
    playAddSound();
    triggerToast(`🎉 Unlocked FREE ${targetDish.name} added to Basket!`);
  };

  // CLAIM FREE MONDAY MEDIUM PIZZA (Selected by customer)
  const claimFreeMondayPizza = (mediumPizzaItem) => {
    if (!mediumPizzaItem) return;

    const offer = OFFERS.MONDAY_PIZZA;
    const cartItemId = `FREE_PROMO_${offer.id}`;
    
    // Remove any existing free Monday pizza first
    setCart(prev => {
      const filtered = prev.filter(i => !(i.isFreePromo && i.promoId === offer.id));
      const freePizzaPayload = {
        cartItemId,
        id: mediumPizzaItem.id,
        name: mediumPizzaItem.name,
        category: 'Pizza',
        image: mediumPizzaItem.image,
        sizeName: 'Medium (10")',
        stuffedCrust: false,
        crustPrice: 0,
        extraCheeseSlice: false,
        cheeseSlicePrice: 0,
        unitPrice: 0,
        originalPrice: 349, // standard medium pizza price
        quantity: 1,
        isFreePromo: true,
        promoId: offer.id,
        promoLabel: 'FREE — Monday Offer',
      };
      return [...filtered, freePizzaPayload];
    });

    playAddSound();
    triggerToast(`🎉 FREE Medium ${mediumPizzaItem.name} added to Basket!`);
    setIsMondayPizzaModalOpen(false);
  };

  // Update item quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
            // Free promo items have fixed quantity 1
            if (ci.isFreePromo) {
              return delta < 0 ? null : ci;
            }
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean);
    });
  };

  // Remove single item
  const removeFromCart = (cartItemId) => {
    setCart((prevCart) => prevCart.filter((ci) => ci.cartItemId !== cartItemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // POST ORDER TO GOOGLE SHEETS WEBHOOK
  const sendOrderToGoogleSheet = async (orderPayload) => {
    if (!restaurantInfo.googleSheetWebhookUrl || restaurantInfo.googleSheetWebhookUrl.includes('placeholder')) {
      return;
    }
    try {
      await fetch(restaurantInfo.googleSheetWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify(orderPayload),
      });
    } catch (e) {
      // Ignore background post errors
    }
  };

  // Cart Metrics
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        claimFreePromoItem,
        claimFreeMondayPizza,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        promoEval,
        applyLoyalty,
        setApplyLoyalty,
        isMondayPizzaModalOpen,
        setIsMondayPizzaModalOpen,
        isCartOpen,
        setIsCartOpen,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        tableNumber,
        setTableNumber,
        toast,
        sendOrderToGoogleSheet,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
