import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;
const PYTHON_URL = `${process.env.REACT_APP_PYTHON_URL}`;

const initialState = {
  isProductLoading: false,
  dataProduct: { products: [], total: 0 }, // Update initial state to include products and total
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
};


export const getAllProducts = createAsyncThunk(
  "product/getall",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { page, limit }, // Send pagination params
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const getSearchProducts = createAsyncThunk(
  "product/search",
  async ({ query, session_context }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${PYTHON_URL}/search/`, {
        query,
        session_context, // Send query and session_context in the body
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const addSearchKeyword = createAsyncThunk(
  "user/search",
  async ({ query, user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${API_URL}/api/users/keyword/add`, {
        query,
        user_id
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsProductLoading(state, action) {
      state.isProductLoading = action.payload;
    },
    resetProducts(state) {
      state.dataProduct = []; // Clear products when necessary
    },
    updateSearchHistory(state, action) {
      state.searchHistory = action.payload; 
      toast.success("Search history updated successfully!", {
        position: toast.POSITION.TOP_CENTER,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { products, total } = action.payload; // Destructure the expected properties
        state.dataProduct.products = [
          ...state.dataProduct.products,
          ...products,
        ]; // Append new products
        state.dataProduct.total = total; // Update total if necessary
        state.isProductLoading = false;// Append new products
        // toast.success("Products loaded successfully!", {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000,
        // });
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isProductLoading = false;
        // toast.error(`Failed to load products: ${action.payload}`, {
        //   position: toast.POSITION.TOP_CENTER,
        //   autoClose: 3000,
        // });
      })
      .addCase(getSearchProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.dataProduct.products = action.payload.products;
        state.dataProduct.total = action.payload.total;
        state.isProductLoading = false;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.isProductLoading = false;
      });
  },
});

// Correctly export the reducer and actions separately
export const { setIsProductLoading, resetProducts, updateSearchHistory } = userSlice.actions;
export default userSlice.reducer;
