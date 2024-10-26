import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupons, setCoupons] = useState({ 'DISCOUNT10': 10, 'OFF20': 20 });

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((prevItem) => prevItem.id === item.id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += 1;
        return updatedItems;
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const updateItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyCoupon = (couponCode) => {
    return coupons[couponCode] || 0;
  };

  const value = {
    cartItems,
    setCartItems,
    addToCart,
    updateItemQuantity,
    removeItem,
    applyCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
