import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
import { API_URL, PYTHON_URL, CHUNKING_URL } from "../config";

const CHUNKING_SERVER_API = CHUNKING_URL;

const initialState = {
  isOrderLoading: false,
  isProductLoading: false,
  isUserLoading: false,
  isFileLoading: false,
  isCategoryLoading: false,
  dataUser: { users: [], total: 0 },
  dataFileUpload: { files: [], total: 0 },
  dataProduct: { products: [], total: 0, currentPage: 1, limit: 15 },
  dataOrder: { orders: [], total: 0 },
  dataCategory: { categories: [], total: 0 }, // New category state
  recommendedProducts: [],
  alert: {
    show: false,
    message: "",
    variant: "light",
  },
  isEmbeddingLoading: false,
  embeddingResults: null,
  embeddingModel: null,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  "product/getall",
  async ({ page = 1, limit = 15, search = "" }, { rejectWithValue }) => {
    try {
      const params = {
        page,
        limit,
        search: search.toLowerCase(), // Normalize to lowercase
      };
      const res = await axios.get(`${API_URL}/api/products`, { params });
      const { products, total } = res.data;
      return { products, total, page };
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "order/getall",
  async ({ }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/order/getAll`);
      const { orders } = res.data;
      return { orders };
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const getOneProduct = createAsyncThunk(
  "product/getOne",
  async ( product_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/${product_id}`);
      const products = res.data;
      return products ;
       } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getProductsByCategory = createAsyncThunk(
  "product/getByCategory",
  async (
    { page = 1, limit = 15, search = "", category },
    { rejectWithValue }
  ) => {
    try {
      const params = {
        page,
        limit,
        search: search.toLowerCase(), // Normalize to lowercase
      };
      const res = await axios.get(
        `${API_URL}/api/products/category/${category}`,
        { params }
      );

      // Check if the response structure is correct
      const productsData = res.data || {}; // Ensure res.data is an object
      const { products = [], total = 0, page: responsePage = 1 } = productsData; // Fallback to default values

      return { products, total, page: responsePage, category };
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getall",
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/category/get`);
      return res.data; // Assuming API returns `{ categories: [], total: 0 }`
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
      const res = await axios.get(`${API_URL}/api/user/profile/list`);
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getOneUser = createAsyncThunk(
  "user/getOne",
  async (user_id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/user/profile/id/${user_id}`);
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

export const getAllChunkFromSelectedFile = createAsyncThunk(
  "file/getAllChunk",
  async (payload, { rejectWithValue }) => {
    try {
      // Send the payload in the request body
      const res = await axios.post(`${API_URL}/api/files/chunking_list/`, payload);
      return res.data;
    } catch (error) {
      console.error("API error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const embeddingChunkingList = createAsyncThunk(
  "file/embeddingChunkingList",
  async (payload, { rejectWithValue }) => {
    try {
      console.log("Flattened json_list for embedding:", payload);
      const res = await axios.post(`${PYTHON_URL}/embedding`, { json_list: payload });
      return res.data; // Contains `embedding_results` and `model`
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

      const res = await axios.post(`${CHUNKING_SERVER_API}/chunking/`, formData, {
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

export const getAllUniqueIndexName = createAsyncThunk(
  "file/getAllUniqueIndexName",
  async (_arg, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/products/index_name/getAll`);
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
    setIsOrderLoading(state, action) {
      state.isOrderLoading = action.payload;
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
      .addCase(getProductsByCategory.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        const { products, total, page, category } = action.payload;
        // You can store the products in a way that groups by category, if needed
        state.dataProduct.products =
          page === 1 ? products : [...state.dataProduct.products, ...products];
        state.dataProduct.total = total;
        state.dataProduct.currentPage = page;
        state.dataProduct.category = category; // Optionally track the category in state
        state.isProductLoading = false;
      })
      .addCase(getProductsByCategory.rejected, (state) => {
        state.isProductLoading = false;
      })
      .addCase(getAllCategories.pending, (state) => {
        state.isCategoryLoading = true;
      })
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.dataCategory.categories = action.payload.categories;
        state.dataCategory.total = action.payload.total;
        state.isCategoryLoading = false;
      })
      .addCase(getAllCategories.rejected, (state) => {
        state.isCategoryLoading = false;
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
      })
      .addCase(embeddingChunkingList.pending, (state) => {
        state.isEmbeddingLoading = true;
        state.error = null;
      })
      .addCase(embeddingChunkingList.fulfilled, (state, action) => {
        const { embedding_results, model } = action.payload;
        state.embeddingResults = embedding_results;
        state.embeddingModel = model;
        state.isEmbeddingLoading = false;
        toast.success("Embedding completed successfully!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(embeddingChunkingList.rejected, (state, action) => {
        state.isEmbeddingLoading = false;
        state.error = action.payload || "Embedding failed.";
        toast.error(`Embedding failed: ${state.error}`, {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        });
      })
      .addCase(getOneProduct.pending, (state) => {
        state.isProductLoading = true;
      }
      )
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.dataProduct.products = action.payload;
      })
      .addCase(getOneProduct.rejected, (state) => {
        state.isProductLoading = false;
      })
      //Get all unique index name
      .addCase(getAllUniqueIndexName.pending, (state) => {
        state.isProductLoading = true;
      })
      .addCase(getAllUniqueIndexName.fulfilled, (state, action) => {
        state.isProductLoading = false;
        state.dataProduct.products = action.payload;
      })
      .addCase(getAllUniqueIndexName.rejected, (state) => {
        state.isProductLoading = false;
      })
      //Get All Orders
      .addCase(getAllOrders.pending, (state) => {
        state.isOrderLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isOrderLoading = false;
        state.dataOrder.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isOrderLoading = false;
      })
  },
});

// Correctly export the reducer and actions separately
export const { setIsProductLoading, resetProducts, setIsOrderLoading } = userSlice.actions;
export default userSlice.reducer;
