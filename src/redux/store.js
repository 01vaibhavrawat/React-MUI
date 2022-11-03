import { configureStore } from '@reduxjs/toolkit';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import bannerReducer from './bannerSlice';

export default configureStore({
  reducer: {
    productReducer: productReducer,
    categoryReducer: categoryReducer,
    bannerReducer: bannerReducer
  },
})