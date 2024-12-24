import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;
const PYTHON_URL = `${process.env.REACT_APP_PYTHON_URL}`;

const initialState = {
  isProductLoading: false,
  isUserLoading: false,
  isFileLoading: false,
  dataUser: { users: [], total: 0 },
  dataFileUpload: { files: [], total: 0 },
  dataProduct: { products: [], total: 0, currentPage: 1, limit: 15 },
  recommendedProducts:[],
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
  error: null,
  searchQuery:'',
  searchHistory: [], // Initialize search history state
};

export const getAllProducts = createAsyncThunk(
  "product/getall",
  async ({ page = 1, limit = 15 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { page, limit },
      });
      const { products, total } = res.data;
      return { products, total, page };
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
        session_context,
      });
      // console.log("res", res.data);
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
      // Call the recommendation API
      const res = await axios.post(`${PYTHON_URL}/recommend`, { user_id });
      // console.log("Recommendation API response:", res.data);

      return res.data.recommendations; // Return recommendations if the call is successful
    } catch (error) {
      console.error("Recommendation API error:", error);

      // Handle API failure gracefully
      return rejectWithValue(
        error.response?.data || "Failed to fetch recommendations."
      );
    }
  }
);


export const addSearchKeyword = createAsyncThunk(
  "user/search",
  async ({ query, user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/user/keyword/add`, {
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

export const removeSearchHistoryItem = createAsyncThunk(
  "user/search/remove",
  async ({ query, user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/api/user/keyword/remove`, {
        data: { query, user_id },
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const clearAllSearchHistory = createAsyncThunk(
  "user/search/clear-all",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${API_URL}/api/user/keyword/remove-all`, {
        data: { user_id },
      });
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
)

export const getAllUser = createAsyncThunk(
  "user/getAll",
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/users/profile/list`);
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllFile = createAsyncThunk(
  "file/getAll",
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/files/`);
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "file/upload",
  async ({ file, file_type }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("files", file);
      formData.append("file_type", file_type);

      const res = await axios.post(`${PYTHON_URL}/chunking/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
      state.dataProduct = { products: [], total: 0, currentPage: 1, limit: 15 };
    },
    updateSearchHistory(state, action) {
      state.searchHistory = action.payload;
    },
    setSearchQuery(state, action) {
      state.searchQuery = action.payload
    },
    resetSearchHistory(state) {
      state.searchHistory = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        const { products, total, page } = action.payload;
        state.dataProduct.products =
          page === 1 ? products : [...state.dataProduct.products, ...products];
        state.dataProduct.total = total;
        state.dataProduct.currentPage = page;
        state.isProductLoading = false;
      })
      .addCase(getAllProducts.rejected, (state) => {
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
      .addCase(getSearchProducts.rejected, (state) => {
        state.isProductLoading = false;
      })
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
      .addCase(removeSearchHistoryItem.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(removeSearchHistoryItem.fulfilled, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(removeSearchHistoryItem.rejected, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(clearAllSearchHistory.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(clearAllSearchHistory.fulfilled, (state, action) => {
        state.isUserLoading = false;
      })
      .addCase(clearAllSearchHistory.rejected, (state, action) => {
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
        state.loading = false;
        state.error = action.payload; // Capture error message
        state.recommendations = []; // Optional: Clear recommendations on failure
      })
    .addCase(getAllFile.pending, (state) => {
        state.isFileLoading = true;
      })
      .addCase(getAllFile.fulfilled, (state, action) => {
        state.dataFileUpload.files = action.payload.fileUploads; // Ensure `fileUploads` matches the API response
        state.dataFileUpload.total = action.payload.total;
        state.isFileLoading = false;
      })
      .addCase(getAllFile.rejected, (state, action) => {
        state.isFileLoading = false;
        toast.error(`Failed to load files: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(uploadFile.pending, (state) => {
        state.isFileLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isFileLoading = false;
        toast.success("File uploaded successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isFileLoading = false;
        toast.error(`Failed to upload file: ${action.payload}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      });
  },
});

// Correctly export the reducer and actions separately
export const {
  setIsProductLoading,
  resetProducts,
  updateSearchHistory,
  setSearchQuery,
  resetSearchHistory,
} = userSlice.actions;
export default userSlice.reducer;
