import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

export const googleLogin = createAsyncThunk(
  "authen/googleLogin",
  async (token, { rejectWithValue }) => {
    try {
      // Send the token as `credential` in the request body
      const response = await axios.post(`${API_URL}/api/auth/google`, {
        credential: token,
      });

      // Log the response data for debugging
      // console.log(response.data);

      return response.data;
    } catch (error) {
      // Check if error response exists and has a message
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      console.error("Error during Google login:", errorMessage); // Log the error for debugging

      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuth: false,
    isLoading: false,
    error: null,
  },
  reducers: {
    // Corrected here
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
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
export const { logout } = authSlice.actions;
export default authSlice.reducer;
