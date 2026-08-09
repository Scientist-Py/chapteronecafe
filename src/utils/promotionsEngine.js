// Pure Promotion Engine for Chapter One Cafe
// Calculates live thresholds, progress, smart product suggestions, and Monday pizza qualification

export const OFFERS = {
  MOJITO_399: {
    id: 'mojito_399',
    title: 'FREE Green Apple Mojito',
    threshold: 399,
    rewardType: 'free_item',
    targetItemSearch: 'Green Apple Mojito',
    targetCategoryId: 'Mojitos',
    icon: '🍏',
    description: 'Spend ₹399 or more to unlock',
  },
  COFFEE_599: {
    id: 'coffee_599',
    title: 'FREE Cold Coffee',
    threshold: 599,
    rewardType: 'free_item',
    targetItemSearch: 'Classic Cold Coffee',
    targetCategoryId: 'Cold Coffee',
    icon: '☕',
    description: 'Spend ₹599 or more to unlock',
  },
  MONDAY_PIZZA: {
    id: 'monday_pizza',
    title: 'MONDAY SPECIAL: Buy 1 Large Pizza → Get 1 Medium FREE',
    rewardType: 'monday_pizza',
    icon: '🍕',
    description: 'Buy Any 1 Large Pizza and get 1 Medium Pizza FREE on Mondays',
  },
  LOYALTY_12: {
    id: 'loyalty_12',
    title: '12% OFF Loyalty Reward',
    rewardType: 'discount_percent',
    discountPercent: 12,
    icon: '🔄',
    description: '3rd visit within 7 days',
  }
};

/**
 * Calculates current day & Monday status
 */
export function isTodayMonday() {
  return new Date().getDay() === 1;
}

/**
 * Checks visit history for Loyalty Reward (3rd visit within 7 days)
 */
export function checkLoyaltyQualification() {
  try {
    const raw = localStorage.getItem('chapter_one_visit_history');
    let history = raw ? JSON.parse(raw) : [];
    
    const now = Date.now();
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

    // Filter visits within last 7 days
    history = history.filter(ts => typeof ts === 'number' && (now - ts) <= SEVEN_DAYS_MS);

    // Record current visit if last visit was > 1 hour ago
    if (history.length === 0 || (now - history[history.length - 1]) > (60 * 60 * 1000)) {
      history.push(now);
      localStorage.setItem('chapter_one_visit_history', JSON.stringify(history));
    }

    return history.length >= 3;
  } catch (e) {
    return false;
  }
}

/**
 * Calculates eligible paid cart subtotal (excluding ₹0 free promo items)
 */
export function getEligiblePaidSubtotal(cartItems = []) {
  return cartItems.reduce((total, item) => {
    if (item.isFreePromo) return total;
    return total + (item.unitPrice * item.quantity);
  }, 0);
}

/**
 * Checks if cart qualifies for Monday Pizza Offer
 * Customer must have at least 1 Large Pizza (or 17" Giant Pizza)
 */
export function checkMondayPizzaQualification(cartItems = []) {
  if (!isTodayMonday()) return false;
  
  return cartItems.some(item => {
    if (item.isFreePromo) return false;
    const isLarge = item.sizeName && item.sizeName.toLowerCase().includes('large');
    const is17Giant = item.name && item.name.toLowerCase().includes('17"');
    return isLarge || is17Giant;
  });
}

/**
 * Evaluates all active promotions in real-time
 */
export function evaluatePromotions(cartItems = [], allMenuItems = [], applyLoyalty = false) {
  const isMonday = isTodayMonday();
  const paidSubtotal = getEligiblePaidSubtotal(cartItems);
  const isLoyaltyQualified = checkLoyaltyQualification();
  const isMondayQualified = checkMondayPizzaQualification(cartItems);

  // Check which free items are already in cart
  const hasFreeMojitoInCart = cartItems.some(i => i.isFreePromo && i.promoId === OFFERS.MOJITO_399.id);
  const hasFreeCoffeeInCart = cartItems.some(i => i.isFreePromo && i.promoId === OFFERS.COFFEE_599.id);
  const hasFreeMondayPizzaInCart = cartItems.some(i => i.isFreePromo && i.promoId === OFFERS.MONDAY_PIZZA.id);

  // Status for 399 Mojito
  const mojitoUnlocked = paidSubtotal >= OFFERS.MOJITO_399.threshold;
  const mojitoNeeded = Math.max(0, OFFERS.MOJITO_399.threshold - paidSubtotal);
  const mojitoProgress = Math.min(1, paidSubtotal / OFFERS.MOJITO_399.threshold);

  // Status for 599 Coffee
  const coffeeUnlocked = paidSubtotal >= OFFERS.COFFEE_599.threshold;
  const coffeeNeeded = Math.max(0, OFFERS.COFFEE_599.threshold - paidSubtotal);
  const coffeeProgress = Math.min(1, paidSubtotal / OFFERS.COFFEE_599.threshold);

  // Priority Offer Detection (Most relevant next offer)
  let primaryOffer = null;

  if (!mojitoUnlocked && mojitoNeeded > 0) {
    primaryOffer = {
      type: 'mojito_399',
      needed: mojitoNeeded,
      threshold: OFFERS.MOJITO_399.threshold,
      current: paidSubtotal,
      progress: mojitoProgress,
      message: `You're only ₹${mojitoNeeded} away from a FREE Green Apple Mojito!`,
      shortMessage: `₹${mojitoNeeded} more → FREE Green Apple Mojito`,
    };
  } else if (mojitoUnlocked && !coffeeUnlocked && coffeeNeeded > 0) {
    primaryOffer = {
      type: 'coffee_599',
      needed: coffeeNeeded,
      threshold: OFFERS.COFFEE_599.threshold,
      current: paidSubtotal,
      progress: coffeeProgress,
      message: `You're only ₹${coffeeNeeded} away from a FREE Cold Coffee!`,
      shortMessage: `₹${coffeeNeeded} more → FREE Cold Coffee`,
    };
  }

  // Find Smart Menu Suggestions to help cross the next threshold
  let smartSuggestions = [];
  if (primaryOffer && primaryOffer.needed > 0 && allMenuItems.length > 0) {
    const gap = primaryOffer.needed;
    smartSuggestions = allMenuItems
      .filter(item => !item.hasSizes && item.price >= gap && item.price <= gap + 150)
      .sort((a, b) => a.price - b.price)
      .slice(0, 3);

    // Fallback if no exact range match
    if (smartSuggestions.length === 0) {
      smartSuggestions = allMenuItems
        .filter(item => !item.hasSizes && item.price >= 49)
        .sort((a, b) => Math.abs(a.price - gap) - Math.abs(b.price - gap))
        .slice(0, 3);
    }
  }

  // Calculate Loyalty Discount if qualified & applied
  let loyaltyDiscountAmount = 0;
  if (isLoyaltyQualified && applyLoyalty) {
    loyaltyDiscountAmount = Math.round(paidSubtotal * (OFFERS.LOYALTY_12.discountPercent / 100));
  }

  const grandTotal = Math.max(0, paidSubtotal - loyaltyDiscountAmount);

  return {
    paidSubtotal,
    grandTotal,
    isMonday,
    isMondayQualified,
    isLoyaltyQualified,
    loyaltyDiscountAmount,

    // Offer unlocked flags
    mojitoUnlocked,
    mojitoNeeded,
    mojitoProgress,
    hasFreeMojitoInCart,

    coffeeUnlocked,
    coffeeNeeded,
    coffeeProgress,
    hasFreeCoffeeInCart,

    hasFreeMondayPizzaInCart,

    primaryOffer,
    smartSuggestions,
  };
}
