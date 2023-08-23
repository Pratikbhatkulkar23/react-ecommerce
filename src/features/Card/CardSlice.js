import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AddToCard ,FetchItemByUsesrID,UpdateCart,DeleteItemFromCart,CartItemRest} from './CardAPI';

const initialState = {
  status: 'idl',
 items:[]
};


export const AddCartAsync = createAsyncThunk(
  'cart/AddToCard',
  async (item ) => {
    const response = await AddToCard(item);
   
    return response.data;
  }
);
export const UpdateCartAsync = createAsyncThunk(
  'cart/UpdateCartAsync',
  async (update ) => {
    console.log(update);
    const response = await UpdateCart(update);
   
    return response.data;
  }
);
export const DeleteItemFromCartAsync = createAsyncThunk(
  'cart/DeleteItemFromCartAsync',
  async (itemId)=>{

    const response = await DeleteItemFromCart(itemId);
   
    return response.data;
  }
);
export const CartItemRestAsync = createAsyncThunk(
  'cart/CartItemRest',
  async (userID)=>{

    const response = await CartItemRest(userID);
   
    return response.data;
  }
);
export const FetchItemByUsesrIDAsync = createAsyncThunk(
  'cart/FetchItemByUsesrID',
  async (userID ) => {
    const response = await FetchItemByUsesrID(userID);
     console.log(response.data);
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: 'AddToCard',
  initialState,
 
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(AddCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(AddCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
        
      }).addCase(FetchItemByUsesrIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(FetchItemByUsesrIDAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        
      })
    .addCase(UpdateCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(UpdateCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    
      const chekc = state.items
      
      const index = state.items.findIndex(item=>item.id===action.payload.id)
      console.log(index);
      state.items[index] = action.payload;
      
    })
    .addCase(DeleteItemFromCartAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(DeleteItemFromCartAsync.fulfilled, (state, action) => {
      state.status = 'idle';

      
      const index = state.items.findIndex(item=>item.id===action.payload.id)
      console.log(index);
      
      state.items.slice(index,1);
      
    })
    .addCase(CartItemRestAsync.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(CartItemRestAsync.fulfilled, (state, action) => {
      state.status = 'idle';
    });
    
  },
});




export const selectcart = (state) => state.cart.items;




export default counterSlice.reducer;
