import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddOrder } from './orderAPI';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrder:null,
};


export const AddOrderAsync = createAsyncThunk(
  'order/createorder',
  async (order) => {
    const response = await AddOrder(order);
    
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: 'counter',
  initialState,
 
  reducers: {
    restOrder:(state)=>{
      state.currentOrder = null

    }
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push[action.payload];
        state.currentOrder = action.payload;
      });
  },
});

export const { restOrder } = orderSlice.actions;


 export const selectcurrentOrderPlaceS = (state) => state.order.currentOrder;




export default orderSlice.reducer;
