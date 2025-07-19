/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from "react";

const LikedContext = createContext();

export const useLiked = () => useContext(LikedContext);

export const LikedProvider = ({ children }) => {
  const [likedItems, setLikedItems] = useState([]);

  useEffect(() => {
    const savedLiked = localStorage.getItem('likedProducts');
    if (savedLiked) {
      try {
        setLikedItems(JSON.parse(savedLiked));
      } catch (error) {
        console.error('Error loading liked products:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('likedProducts', JSON.stringify(likedItems));
  }, [likedItems]);

  const addToLiked = (product) => {
    setLikedItems(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromLiked = (productId) => {
    setLikedItems(prev => prev.filter(item => item.id !== productId));
  };

  const isLiked = (productId) => {
    return likedItems.some(item => item.id === productId);
  };

  const toggleLiked = (product) => {
    if (isLiked(product.id)) {
      removeFromLiked(product.id);
    } else {
      addToLiked(product);
    }
  };

  const clearLiked = () => {
    setLikedItems([]);
  };

  return (
    <LikedContext.Provider
      value={{
        likedItems,
        addToLiked,
        removeFromLiked,
        isLiked,
        toggleLiked,
        clearLiked,
        likedCount: likedItems.length
      }}
    >
      {children}
    </LikedContext.Provider>
  );
};