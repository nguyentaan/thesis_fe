import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"; // Import the default export
import authnReducer from "./AuthenSlice"; // Import the default export
import cartReducer from "./CartSlice"; // Import the default export
import orderReducer from "./OrderSlice";
import reviewReducer from "./ReviewSlice";
import chatbotReducer from "./ChatbotSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user", "cart", "order", "review"],
};

const persistedUserReducer = persistReducer(persistConfig, userReducer);
const persistedAuthnReducer = persistReducer(persistConfig, authnReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedOrderReducer = persistReducer(persistConfig, orderReducer);
const persistedReviewReducer = persistReducer(persistConfig, reviewReducer);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    auth: persistedAuthnReducer,
    cart: persistedCartReducer,
    order: persistedOrderReducer,
    review: persistedReviewReducer,
    chatbot: chatbotReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
