import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;
const PYTHON_URL = `${process.env.REACT_APP_PYTHON_URL}`;

const initialState = {
  isProductLoading: false,
  isUserLoading: false,
  dataUser: { users: [], total: 0 }, // Update initial state to include products and total
  dataProduct: { products: [], total: 0, currentPage: 1, limit: 15 }, // Added currentPage and limit to state
  recommendedProducts:[],
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getall",
  async ({ page = 1, limit = 15 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { page, limit },
      });
      const { products, total } = res.data; // Extract products and total from response
      return { products, total, page }; // Include current page for pagination handling
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
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
      console.log("res", res.data);

      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getRecommendProducts = createAsyncThunk(
  "product/recommend",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${PYTHON_URL}/recommend`, {
        user_id,
      });
      console.log("res", res.data);
      
      return res.data.recommendations;
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
        user_id,
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllUser = createAsyncThunk(
  "user/getAll",
  async ({} = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/users/profile/list`, {
        // headers: {
        //   Authorization: `Bearer ${refreshToken}`, // Send the refresh token in the Authorization header
        // },
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
      state.dataProduct = { products: [], total: 0, currentPage: 1, limit: 15 }; // Reset product state
    },
    updateSearchHistory(state, action) {
      state.searchHistory = action.payload;
      // toast.success("Search history updated successfully!", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { products, total, page } = action.payload; // Destructure data from the action payload
        state.dataProduct.products =
          page === 1 ? products : [...state.dataProduct.products, ...products]; // If it's the first page, overwrite; else, append
        state.dataProduct.total = total; // Update total number of products
        state.dataProduct.currentPage = page; // Update current page
        state.isProductLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isProductLoading = false;
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
      })
      // Handle User-related actions
      .addCase(getAllUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        const { data } = action.payload;
        state.dataUser.users = data;
        state.isUserLoading = false;
        toast.success("Users loaded successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isUserLoading = false;
        toast.error(`Failed to load users: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(addSearchKeyword.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(addSearchKeyword.fulfilled, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(addSearchKeyword.rejected, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(getRecommendProducts.pending, (state) => {
        state.isProductLoading = true;
        state.recommendedProducts = []; // Clear recommendations while loading
        state.error = null; // Reset error
      })
      .addCase(getRecommendProducts.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.recommendedProducts = action.payload; // Populate recommendations
      })
      .addCase(getRecommendProducts.rejected, (state, action) => {
        state.isProductLoading = false;
        state.error = action.payload || "Failed to fetch recommendations";
      });
  },
});

// Correctly export the reducer and actions separately
export const { setIsProductLoading, resetProducts, updateSearchHistory } =
  userSlice.actions;
export default userSlice.reducer;
