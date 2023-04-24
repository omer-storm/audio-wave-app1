import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import activityService from "./activityService";

const initialState = {
  actvity: { user: {}, recording: {} },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Create Actvity
export const create = createAsyncThunk(
  "activity/create",
  async (activity, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await activityService.create(activity, token);
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
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activity = action.payload;
      })
      .addCase(create.rejected, (state, action) => {
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
