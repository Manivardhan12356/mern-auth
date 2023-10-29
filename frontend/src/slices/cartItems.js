import { createSlice, } from '@reduxjs/toolkit';


const initialState = {
   carts: [],

};


const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addItem: (state, action) => {
         state.carts.push(action.payload);
      },
   },
   
});

export const { addItem } = cartSlice.actions;

export default cartSlice.reducer;

