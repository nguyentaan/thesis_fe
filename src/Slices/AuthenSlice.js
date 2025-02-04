import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../config";
import { jwtDecode } from "jwt-decode"; // Import the jwt-decode library

const handleError = (error) => {
  return error.response && error.response.data.message
    ? error.response.data.message
    : error.message;
};

// Async Thunks for different authentication actions
export const googleLogin = createAsyncThunk(
  "authen/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      // Send the token as `credential` in the request body
      const response = await axios.post(`${API_URL}/api/auth/google-signin`, {
        credential: token,
      });
      console.log("response", response.data);

      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const emailLogin = createAsyncThunk(
  "authen/emailLogin",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/normal-login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const createUser = createAsyncThunk(
  "authen/register",
  async ({ name, email, password, phoneNumber }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        name,
        email,
        password,
        phoneNumber,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteUser = createAsyncThunk(
  "authen/delete",
  async ({ user_id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/user/users/remove-one`,
        {
          user_id,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "authen/product/delete",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/products/delete`, {
        product_id,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const updateUser = createAsyncThunk(
  "authen/update",
  async ({ user_id, update_data }, { rejectWithValue }) => {
    try {
      const { name, email, phoneNumber } = update_data; // Destructure from update_data
      const response = await axios.put(`${API_URL}/api/user/profile/update`, {
        user_id,
        update_data: { name, email, phone: phoneNumber },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ product_id, update_data }, { rejectWithValue }) => {
    try {
      const { name, price, description, category, image_url } = update_data; // Destructure from update_data
      const response = await axios.put(`${API_URL}/api/products/update`, {
        product_id,
        update_data: { name, price, description, category, image_url },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const dashboardData = createAsyncThunk(
  "authen/dashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/api/auth/dashboard`);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Authentication Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: !!localStorage.getItem("accessToken"), // Check if accessToken exists
    isLoading: false,
    error: null,
    accessToken: localStorage.getItem("accessToken"), // Load from localStorage
    refreshToken: localStorage.getItem("refreshToken"), // Load from localStorage
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    loginSuccess(state, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        // Access the access_token from the response properly
        const accessToken = action.payload.data.access_token;
        const refreshToken = action.payload.data.refresh_token;

        // Assuming you want to store the tokens or process them further:
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        // Now decode the accessToken if you want to get the user details
        const decodedToken = jwtDecode(accessToken);

        // Set the decoded user and tokens in the state
        state.user = decodedToken.user;
        state.isAuth = true;
        state.isLoading = false;
      })

      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // Email Login Cases
      .addCase(emailLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // // OTP Verification Cases
      // .addCase(verifyOTP.pending, (state) => {
      //   state.isLoading = true;
      //   state.error = null;
      // })
      // .addCase(verifyOTP.rejected, (state, action) => {
      //   state.error = action.payload; // Capture error message
      //   state.isLoading = false;
      // })
      // User Registration Cases
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = { data: action.payload.data };
        state.isAuth = true; // Set to true upon successful registration
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // User Deletion Cases
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // Product Deletion Cases
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // User Update Cases
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // Product Update Cases
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // Dashboard Data Cases
      .addCase(dashboardData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(dashboardData.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(dashboardData.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      });
  },
});
export const { logout, loginSuccess } = authSlice.actions;
export default authSlice.reducer;
