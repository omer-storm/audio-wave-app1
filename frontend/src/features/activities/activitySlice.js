import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "./activityService";

const initialState = {
  activity: { user: {}, recording: {} },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create Actvity
export const createActivity = createAsyncThunk(
  "activity/create",
  async (activity, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await activityService.createActivity(activity, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.activity = { user: {}, recording: {} };
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(createActivity.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activity = action.payload;
      })
      .addCase(createActivity.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      });
  },
  get extraReducers() {
    return this._extraReducers;
  },
  set extraReducers(value) {
    this._extraReducers = value;
  },
});

export const { reset } = activitySlice.actions;
export default activitySlice.reducer;
