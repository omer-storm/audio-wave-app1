import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    reset: (state) => {},
  },
});

export const { reset } = compareSlice.actions;
export default compareSlice.reducer;
