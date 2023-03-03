import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import comparisionReducer from "../features/comparision/comparisionSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    comparision: comparisionReducer
  },
});
