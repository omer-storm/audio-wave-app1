import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  waveform: {},
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
    reset: (state) => {
      state.waveform = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    setWaveform: (state, action) => {
      state.waveform = action.payload;
    },
    setWaveformPeak: (state, action) => {
      state.waveformPeak = [...action.payload];
    },
  },
});

export const { reset, setWaveform, setWaveformPeak } = waveformSlice.actions;
export default waveformSlice.reducer;
