import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
   loading: false,
   products: [],
   error: null,
// Initial sorting order
};

export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
   const response = await axios.get('http://localhost:8000/api/users/products');
   return response.data.products;
});

const productSlice = createSlice({
   name: 'product',
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
         })
         .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
            state.error = null; 
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message;
         });
   },
});


export default productSlice.reducer;
