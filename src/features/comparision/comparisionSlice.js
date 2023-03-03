import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  wave1: [],
  wave2: [],
  pecentage: null,
};

export const comparisionSlice = createSlice({
  name: "comparision",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.comparision = {};
      state.pecentage = 0;
    },
    setComparision: (state, payload) => {
      const { name, peaks } = payload.payload;
      state[name] = peaks;
    },
    getPercentage: (state) => {
      const { wave1, wave2 } = state;
      const percentage = [];
      let sum = 0;
      let calc = null;
      wave1.forEach((x, i) => {
        calc = (x / wave2[i]) * 100;
        if (!isNaN(calc)) percentage.push(calc);
      });
      percentage.forEach((x) => {
        sum = sum + x;
      });
      let average = sum / percentage.length;
      // if (average > 100) {
      //   const surplus = average - 100;
      //   average = 100 - surplus;
      // }
      console.log(average);
      state.pecentage = average;
    },
  },
});

export const { reset, setComparision, getPercentage } =
  comparisionSlice.actions;
export default comparisionSlice.reducer;
