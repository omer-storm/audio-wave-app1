import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  wave1: [],
  wave2: [],
  percentage: null,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.compare = {};
      state.percentage = 0;
    },
    // setWave1: (state) => {
    //   state.wave1 = payload.peaks;
    // },
    setCompare: (state, payload) => {
      const { name, peaks } = payload.payload;
      state[name] = peaks;
    }
  },
});

export const { reset, setCompare, getPercentage } = compareSlice.actions;
export default compareSlice.reducer;
