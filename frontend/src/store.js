import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import authReducer from './slices/authSlice';
import productReducer from './slices/PoductsData'
import cartReducer from './slices/cartItems';

const store = configureStore({
   reducer: {
      auth: authReducer,
      product: productReducer,
      cart: cartReducer,
     
      [apiSlice.reducerPath]: apiSlice.reducer
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;