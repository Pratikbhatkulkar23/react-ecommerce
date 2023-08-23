import { createAsyncThunk, createSlice, isRejected } from '@reduxjs/toolkit';
import { CreateUser,checkUser,updateUser } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null,
};


export const CreateUserAsync = createAsyncThunk(
  'user/CreateUser',
  async (userData) => {
    const response = await CreateUser(userData);
 
    return response.data;
  }
);

export const UpdateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
    const response = await updateUser(update);
    console.log(response.data);
    return response.data;
  }
);


export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
    
    return response.data;
  }
);
export const counterSlice = createSlice({
  name: 'user',
  initialState,
 
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(CreateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CreateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      // check user below
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected,(state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(UpdateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
  },
});


export const selectError = (state)=>state.auth.error;
export const selectLoggedInUser = (state)=>state.auth.loggedInUser;


export const selectCount = (state) => state.counter.value;




export default counterSlice.reducer;
