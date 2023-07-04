import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import libraryService from "../library/libraryService";

const initialState = {
  progressPeaks: [],
  progressLength: [],
  index: 0,
  library: [],
  waveform: {},
  waveformPeak: [],
  waveformComparePeak: [],
  waveformCompareUrl: "",
  percentage: { peaks: null, length: null },
  total: 1,
  result: "",
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
      state.progress = [];
      state.index = 0;
      state.library = [];
      state.waveform = {};
      state.waveformPeak = {};
      state.waveformComparePeak = [];
      state.waveformCompareUrl = "";
      state.percentage = { peaks: null, length: null };
      state.total = 1;
      state.result = "";
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
        if (!isNaN(calc)) percentage.push(calc);
      });
      percentage.forEach((x) => {
        sum = sum + x;
      });
      let average = sum / percentage.length;

      state.percentage.peaks = isNaN(average) ? null : average;

      //Get Length Percentage
      const length =
        (state.waveformComparePeak.length / state.waveformPeak.length) * 100;
      state.percentage.length = length;
    },
    setWaveformCompareUrl: (state, action) => {
      state.waveformCompareUrl = action.payload;
    },
    nextChallenge: (state) => {
      state.index++;
      state.waveform = state.library[state.index];
      state.waveformPeak = [];
      state.waveformCompareUrl = "";
      state.waveformComparePeak = [];
      state.progressPeaks = [...state.progressPeaks, state.percentage.peaks];
      state.progressLength = [...state.progressLength, state.percentage.length];
      state.percentage = { peaks: null, length: null };
    },
    lastChallenge: (state) => {
      state.progressPeaks = [...state.progressPeaks, state.percentage.peaks];
      state.progressLength = [...state.progressLength, state.percentage.length];
      let Phonetics = 0,
        Completeness = 0;
      state.progressPeaks.forEach((x) => {
        Phonetics += x;
      });
      state.progressLength.forEach((x) => {
        Completeness += x;
      });
      Phonetics = Phonetics / state.progressPeaks.length;
      Completeness = Completeness / state.progressLength.length;
      state.result = `Average Completeness is: ${Completeness.toFixed(
        2
      )}% and average phonetics is ${Phonetics.toFixed(2)}%`;
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
        state.total = state.library.length;
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
  nextChallenge,
  lastChallenge,
} = gameSlice.actions;
export default gameSlice.reducer;
