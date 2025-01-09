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
  recommendedProducts: [],
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getall",
  async ({ page = 1, limit = 15, search = "" }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products`, {
        params: { page, limit, search },
      });
      const { products, total } = res.data;
      return { products, total, page };
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

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
export const { setIsProductLoading, resetProducts } = userSlice.actions;
export default userSlice.reducer;
