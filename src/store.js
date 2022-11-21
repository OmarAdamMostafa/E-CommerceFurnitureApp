import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/SidebarFeature/sidebarSlice';
import productsReducer from './features/ProductsFeature/productsSlice';
import filterReducer from './features/FilterFeature/filterSlice';
import cartReducer from './features/CartFeature/cartSlice';

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
  },
});