import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    // other reducers will be added here if necessary
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
