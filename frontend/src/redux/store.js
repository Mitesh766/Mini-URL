import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import urlReducer from "./urlSlice.js";
export const store = configureStore({
  reducer: {
    user: userReducer,
    url:urlReducer,
  },
});
