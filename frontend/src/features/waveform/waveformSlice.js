import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waveform: {},
  waveformActivity: [],
  waveformPeak: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const waveformSlice = createSlice({
  name: "waveform",
  initialState,
  reducers: {
    resetWaveform: (state) => {
      state.waveform = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setWaveform: (state, action) => {
      state.waveform = { ...action.payload };
      state.waveformActivity = (action.payload.activity != undefined)
        ? [...action.payload.activity.percentage]
        : [];
    },
    setWaveformPeak: (state, action) => {
      state.waveformPeak = [...action.payload];
    },
  },
});

export const { resetWaveform, setWaveform, setWaveformPeak } =
  waveformSlice.actions;
export default waveformSlice.reducer;
