import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"; // Import the default export
import authenReducer from "./AuthenSlice"; // Import the default export
import cartReducer from "./CartSlice"; // Import the default export
import orderReducer from "./OrderSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Correct reducer configuration
    auth: authenReducer, // Correct reducer configuration
    cart: cartReducer, // Correct reducer configuration
    order: orderReducer,
  },
});

export default store;
