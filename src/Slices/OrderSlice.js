import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const initialState = {
  dataOrder: [], // Default empty array
  isOrderLoading: false,
  error: null,
};

export const createOrderFromCart = createAsyncThunk(
  "order/createOrderFromCart",
  async (
    { userId, paymentMethod, shipping_address, fullName, phoneNumber },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/order/create/${userId}`,
        {
          paymentMethod,
          shipping_address,
          fullName,
          phoneNumber,
        }
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOrdersByUserId = createAsyncThunk(
  "order/getOrdersByUserId",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/order/${userId}`);
      return response.data.orders; // Return only the orders array, not the full response object
    } catch (error) {
      console.error("Error fetching orders:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (userId, orderId, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/order/${userId}/${orderId}/cancel`
      );
      console.log("Cancel order response:", response.data);
      
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderFromCart.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.dataOrder = action.payload;
        toast.success("Order created successfully");
      })
      .addCase(createOrderFromCart.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })
      .addCase(getOrdersByUserId.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(getOrdersByUserId.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.dataOrder = action.payload; // Make sure payload is an array
      })
      .addCase(getOrdersByUserId.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.pending, (state) => {
        state.isOrderLoading = true;
        state.error = null;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.dataOrder = action.payload;
        toast.success("Order cancelled successfully");
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.isOrderLoading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default orderSlice.reducer;
