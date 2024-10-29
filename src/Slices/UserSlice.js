import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

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
      });
  },
});

// Correctly export the reducer and actions separately
export const { setIsProductLoading } = userSlice.actions;
export default userSlice.reducer;
