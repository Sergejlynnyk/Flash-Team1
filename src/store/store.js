import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice'; // импортируем редьюсер

export const store = configureStore({
  reducer: {
    cart: cartReducer, // подключаем редьюсер корзины
  },
});
