import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import libraryService from "../library/libraryService";

const initialState = {
  progress: [],
  index: 0,
  library: [],
  waveform: {},
  waveformPeak: [],
  waveformComparePeak: [],
  waveformCompareUrl: "",
  percentage: { peaks: "", length: "" },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Public Library
export const getPublicLibrary = createAsyncThunk(
  "publicLibrary/get",
  async (category, thunkAPI) => {
    try {
      return await libraryService.getPublicLibrary(category);
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

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    resetGame: (state) => {
      state.difficulty = "";
      state.progress = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    setWaveformPeak: (state, action) => {
      state.waveformPeak = [...action.payload];
    },
    setWaveformComparePeak: (state, action) => {
      state.waveformComparePeak = [...action.payload];

      //Get Peak Percentage
      const percentage = [];
      let sum = 0;
      let calc = null;
      state.waveformPeak.forEach((x, i) => {
        calc = (state.waveformComparePeak[i] / x) * 100;
        console.log(state.waveformComparePeak[i]);
        if (!isNaN(calc)) percentage.push(calc);
      });
      percentage.forEach((x) => {
        sum = sum + x;
      });
      let average = sum / percentage.length;

      state.percentage.peaks = isNaN(average)
        ? null
        : average.toFixed(2).toString() + "%";

      //Get Length Percentage
      const length =
        (state.waveformComparePeak.length / state.waveformPeak.length) * 100;
      state.percentage.length = length.toFixed(2).toString() + "%";
    },
    setWaveformCompareUrl: (state, action) => {
      state.waveformCompareUrl = action.payload;
    },
  },
  _extraReducers: (builder) => {
    builder
      .addCase(getPublicLibrary.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicLibrary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.library = action.payload;
        state.waveform = state.library[0];
      })
      .addCase(getPublicLibrary.rejected, (state, action) => {
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

export const {
  resetGame,
  setWaveformPeak,
  setWaveformComparePeak,
  setWaveformCompareUrl,
} = gameSlice.actions;
export default gameSlice.reducer;
