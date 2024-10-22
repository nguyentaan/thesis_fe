import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"; // Import the default export

const store = configureStore({
  reducer: {
    user: userReducer, // Correct reducer configuration
  },
});

export default store;
