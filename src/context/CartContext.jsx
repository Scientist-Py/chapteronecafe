import React, { createContext, useContext, useState, useEffect } from 'react';
import { playAddSound } from '../utils/sound';

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

  // Customer info & Table number
  const [customerName, setCustomerName] = useState(() => localStorage.getItem('chapter_one-[#cname]') || '');
  const [customerPhone, setCustomerPhone] = useState(() => localStorage.getItem('chapter_one-[#cphone]') || '');
  const [tableNumber, setTableNumber] = useState('');

  // Admin Order History State
  const [ordersHistory, setOrdersHistory] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('chapter_one_admin_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });

  // Save cart & customer details to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chapter_one_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('chapter_one_admin_orders', JSON.stringify(ordersHistory));
    } catch (e) {}
  }, [ordersHistory]);

  useEffect(() => {
    try {
      if (customerName) localStorage.setItem('chapter_one-[#cname]', customerName);
      if (customerPhone) localStorage.setItem('chapter_one-[#cphone]', customerPhone);
    } catch (e) {}
  }, [customerName, customerPhone]);

  // Show toast notification
  const triggerToast = (msg) => {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2500);
  };

  // Add Item to Cart
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
      const existingIndex = prevCart.findIndex((ci) => ci.cartItemId === cartItemId);
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
            quantity,
          },
        ];
      }
    });

    // Sound & Toast
    playAddSound();
    const sizeStr = sizeName ? ` (${sizeName})` : '';
    triggerToast(`Added ${item.name}${sizeStr} to Basket!`);
  };

  // Update item quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((ci) => {
          if (ci.cartItemId === cartItemId) {
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

  // LOG NEW ORDER IN ADMIN PANEL
  const logNewOrder = (locationData = {}) => {
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      orderId,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      customerName: customerName.trim() || 'Guest Customer',
      customerPhone: customerPhone.trim() || 'N/A',
      tableNumber: tableNumber.trim() || 'Direct Order',
      items: [...cart],
      totalAmount: cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
      totalCount: cart.reduce((sum, item) => sum + item.quantity, 0),
      status: 'Pending',
      location: locationData,
    };

    setOrdersHistory((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  // Admin Order Status Update
  const updateOrderStatus = (orderId, status) => {
    setOrdersHistory((prev) =>
      prev.map((ord) => (ord.orderId === orderId ? { ...ord, status } : ord))
    );
  };

  // Admin Delete Order
  const deleteOrder = (orderId) => {
    setOrdersHistory((prev) => prev.filter((ord) => ord.orderId !== orderId));
  };

  // Admin Clear All Orders
  const clearAllOrders = () => {
    setOrdersHistory([]);
  };

  // Cart Metrics
  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isAdminOpen,
        setIsAdminOpen,
        customerName,
        setCustomerName,
        customerPhone,
        setCustomerPhone,
        tableNumber,
        setTableNumber,
        toast,
        ordersHistory,
        logNewOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
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
