import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import libraryReducer from "../features/library/librarySlice";
import waveformReducer from "../features/waveform/waveformSlice";
import categoryReducer from "../features/category/categorySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    library: libraryReducer,
    waveform: waveformReducer,
    category: categoryReducer,
  },
});
