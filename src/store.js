import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './features/SidebarFeature/sidebarSlice';
export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});