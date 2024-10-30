import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from '../config';

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
      const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "authen/verify-otp",
  async ({ email, password, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, password, otp });
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
      const response = await axios.post(`${API_URL}/api/auth/register`, { name, email, password, phoneNumber });
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
    isAuth: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true; // Set to true on successful Google login
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
      .addCase(emailLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true; // Change to true upon successful login
        state.isLoading = false;
      })
      .addCase(emailLogin.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // OTP Verification Cases
      .addCase(verifyOTP.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state) => {
        state.isAuth = true; // Set to true on successful OTP verification
        state.isLoading = false;
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      })
      // User Registration Cases
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true; // Set to true upon successful registration
        state.isLoading = false;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload; // Capture error message
        state.isLoading = false;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
