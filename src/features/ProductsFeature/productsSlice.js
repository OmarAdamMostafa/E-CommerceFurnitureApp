import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {},
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', 
  async (url, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  'products/fetchSingleProduct', 
  async (url, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsLoading = true;
        state.productsError = false;
      }).addCase(fetchProducts.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.featuredProducts = action.payload.filter((product)=>product.featured === true);
        state.products = action.payload
      }).addCase(fetchProducts.rejected, (state) => {
        state.productsLoading = false;
        state.productsError = true;
      }).addCase(fetchSingleProduct.pending, (state) => {
        state.singleProductLoading = true;
        state.singleProductError = false;
      }).addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.singleProductLoading = false;
        state.singleProduct = action.payload
      }).addCase(fetchSingleProduct.rejected, (state) => {
        state.singleProductLoading = false;
        state.singleProductError = true;
      })
  },
});

export default productsSlice.reducer;
