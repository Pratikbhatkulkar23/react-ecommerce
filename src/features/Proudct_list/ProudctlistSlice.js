import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProudctlist,fetchProudctlistFilter,fetchBrand,fetchCatgeory,fetchProductbyID} from './ProudctlistAPI';

const initialState = {
  products:[],
  status: 'idle',
  TotalItems:0,
  Catgeory:[],
  Brand:[],
  selectedProduct:null,
};

export const fetchAllProductByIdAsync = createAsyncThunk(
  'proudct/fetchProductbyID', //api url
  async (id) => {
    const response = await fetchProductbyID(id);
    
    return response.data;
  }
);

export const fetchProudctlistAsync = createAsyncThunk(
  'proudct/fetchProudctlist', //api url
  async () => {
    const response = await fetchProudctlist();
    
    return response.data;
  }
);
//call api using this function
export const fetchBrandAsync = createAsyncThunk(
  'proudct/fetchBrand', //api url
  async () => {
    const response = await fetchBrand();
    
    return response.data;
  }
);
export const fetchCatgeoryAsync = createAsyncThunk(
  'proudct/fetchCatgeory', //api url
  async () => {
    const response = await fetchCatgeory();
    
    return response.data;
  }
);

export const fetchProudctlistFilterAsync = createAsyncThunk(
  'proudct/fetchProudctlistFilter',
  async ({filter,sort,pagination}) => {
    const response = await fetchProudctlistFilter(filter,sort,pagination);
    
    return response.data;
  
  }
);

export const ProudctSlice = createSlice({
  name: 'proudct',
  initialState,
 
  reducers: {
    increment: (state) => {
     
      state.value += 1;
    },
  
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProudctlistAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProudctlistAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProudctlistFilterAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProudctlistFilterAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItem = action.payload.TotalItems;
       
      })
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Brand = action.payload;
        
      })
      
      .addCase(fetchCatgeoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCatgeoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.Catgeory = action.payload;
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload;
      })
  },
});

export const { increment, } = ProudctSlice.actions;


export const selectAllproducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItem;
export const selectBrand = (state) => state.product.Brand;
export const selectCatgeory = (state) => state.product.Catgeory;
export const selectProductById = (state) => state.product.selectedProduct;





export default ProudctSlice.reducer;
