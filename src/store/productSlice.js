import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  product: null,
  status: 'idle',
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.status = 'loading';
    },
    fetchProductsSuccess: (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
    fetchProductByIdStart: (state) => {
      state.status = 'loading';
    },
    fetchProductByIdSuccess: (state, action) => {
      state.status = 'succeeded';
      state.product = action.payload;
    },
    fetchProductByIdFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

// Actions
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
} = productsSlice.actions;

// Fetch all products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsStart());
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

// Fetch product by ID
export const fetchProductById = (id) => async (dispatch) => {
  dispatch(fetchProductByIdStart());
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const data = await response.json();
    dispatch(fetchProductByIdSuccess(data));
  } catch (error) {
    dispatch(fetchProductByIdFailure(error.message));
  }
};

export default productsSlice.reducer;
