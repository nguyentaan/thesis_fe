import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const initialState = {
  dataCart: [],
  isCartLoading: false,
  // cartTotal: 0,
  error: null,
};

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId, quantity, size }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        userId,
        productId,
        quantity,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart/increase`, {
        userId,
        productId,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/api/cart/decrease`, {
        userId,
        productId,
        size,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  "cart/removeItem",
  async ({ userId, productId, size }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/api/cart/remove`, {
        data: { userId, productId, size },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.dataCart = [];
      // state.cartTotal = 0;
    },
    setCartData: (state, action) => {
      state.dataCart = action.payload;
      // state.cartTotal = calculateCartTotal(state.dataCart); // Calculate total here
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isCartLoading = false;
        state.dataCart = action.payload.items;
        // state.cartTotal = calculateCartTotal(state.dataCart); // Calculate total here
        toast.success("Item added to cart!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
        toast.error(`Failed to add item: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      // Handling fetching cart items
      .addCase(fetchCart.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.dataCart = action.payload.items;
        // state.cartTotal = calculateCartTotal(state.dataCart); // Calculate total here
        state.isCartLoading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
      })
      // Handling increasing quantity
      .addCase(increaseQuantity.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        state.dataCart = action.payload.items;
        // state.cartTotal = calculateCartTotal(state.dataCart); // Calculate total here
        state.isCartLoading = false;
        toast.success("Quantity increased!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(increaseQuantity.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
        toast.error(`Failed to increase quantity: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      // Handling decreasing quantity
      .addCase(decreaseQuantity.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        state.dataCart = action.payload.items;
        // state.cartTotal = calculateCartTotal(state.dataCart); // Calculate total here
        state.isCartLoading = false;
        toast.success("Quantity decreased!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(decreaseQuantity.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
        toast.error(`Failed to decrease quantity: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      // Handling removing item
      .addCase(removeItem.pending, (state) => {
        state.isCartLoading = true;
      })
      .addCase(removeItem.fulfilled, (state, action) => {
        state.dataCart = action.payload.items;
        // state.cartTotal = action.payload.total;
        state.isCartLoading = false;
        toast.success("Item removed from cart!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(removeItem.rejected, (state, action) => {
        state.isCartLoading = false;
        state.error = action.payload;
        toast.error(`Failed to remove item: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  },
});

export const { clearCart, setCartData } = cartSlice.actions;
export default cartSlice.reducer;
