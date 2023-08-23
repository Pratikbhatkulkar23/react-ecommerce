import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/Proudct_list/ProudctlistSlice';
import authReducer from '../features/auth/Compontes/authSlice';
import cartReducer from '../features/Card/CardSlice';
import orderReducer from '../features/order/orderSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth:authReducer,
    cart:cartReducer,
    order: orderReducer,
  },
});
