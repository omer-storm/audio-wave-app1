import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  overlap: false,
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    reset: (state) => {
      state.overlap = false;
    },
    setOverlap: (state) => {
      state.overlap = true;
    },
  },
});

export const { reset, setOverlap } = compareSlice.actions;
export default compareSlice.reducer;
