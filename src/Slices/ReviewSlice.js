import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.REACT_APP_API_URL}`;

// Async thunks for API calls
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/review/${productId}`);
      return response.data.reviews || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const writeReview = createAsyncThunk(
  "reviews/writeReview",
  async ({ productId, rating, reviewText, userId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/review/write`, {
        productId,
        rating,
        reviewText,
        userId,
      });
      return response.data.review;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reviews
      .addCase(fetchReviews.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload || [];
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(writeReview.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(writeReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews.push(action.payload);
        toast.success("Review added successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(writeReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(`Failed to add review: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  },
});

// Export actions and reducer
export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
