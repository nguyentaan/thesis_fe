import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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

// export const addReview = createAsyncThunk(
//   "reviews/addReview",
//   async ({ productId, reviewData }, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         `/api/reviews/${productId}`,
//         reviewData
//       );
//       return response.data; // Assuming API returns the created review
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

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
      });
  },
});

// Export actions and reducer
export const { clearError } = reviewSlice.actions;
export default reviewSlice.reducer;
