import { configureStore } from "@reduxjs/toolkit";
// import AdminProductReducer from "./AdminProductReducer";
// import AdminUserReducer from "./AdminUserReducer";
// import LoginReducer from "./LoginReducer";
import UserReducer from "./UserReducer";

const store = configureStore({
  reducer: {
    user: UserReducer,
  },
})

export default store;
