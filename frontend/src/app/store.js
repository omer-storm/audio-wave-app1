import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import activityReducer from "../features/activities/activitySlice";
import waveformReducer from "../features/waveform/waveformSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    activity: activityReducer,
    waveform: waveformReducer,
  },
});
