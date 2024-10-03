import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../store/authSlice'
import productsReducer from '../store/productSlice'
import cartReducer from '../store/cartSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productsReducer,
    cart: cartReducer,
  }
})