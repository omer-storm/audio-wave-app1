import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import compareReducer from "../features/compare/compareSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    compare: compareReducer
  },
});
