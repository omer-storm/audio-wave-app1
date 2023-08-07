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
  speech: "",
  error: "",
  percentage: null,
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
      state.speech = "";
      state.error = "";
      state.percentage = null;
      state.total = 1;
      state.result = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = "";
    },
    resetWaveform: (state, action) => {
      state.waveformComparePeak = [];
      state.waveformCompareUrl = "";
      state.percentage = null;
      state.speech = "";
      state.error = "";
    },
    setWaveformPeak: (state, action) => {
      state.waveformPeak = [...action.payload];
    },
    setWaveformComparePeak: (state, action) => {
      state.waveformComparePeak = [...action.payload];

      if (state.speech === state.waveform.display || state.speech === "") {
        let length;
        if (state.speech === "") {
          console.log(state.waveformComparePeak.length);

          state.waveformComparePeak.length > state.waveformPeak.length
            ? (length = (state.waveformPeak.length / state.waveformComparePeak.length) * 50)
            : (length = (state.waveformComparePeak.length / state.waveformPeak.length) * 50);
        } else {
          state.waveformComparePeak.length > state.waveformPeak.length
            ? (length = (state.waveformPeak.length / state.waveformComparePeak.length) * 100)
            : (length = (state.waveformComparePeak.length / state.waveformPeak.length) * 100);
        }
        state.percentage = length;
      } else {
        state.error = "incorrect word recognized try again";
      }
    },
    setWaveformCompareUrl: (state, action) => {
      state.waveformCompareUrl = action.payload;
    },
    setSpeech(state, action) {
      state.speech = action.payload;
    },

    nextChallenge: (state) => {
      state.index++;
      state.waveform = state.library[state.index];
      state.waveformPeak = [];
      state.waveformCompareUrl = "";
      state.waveformComparePeak = [];
      state.progressLength = [...state.progressLength, state.percentage.length];
      state.percentage = null;
    },
    lastChallenge: (state) => {
      state.progressLength = [...state.progressLength, state.percentage.length];
      let Percentage;
      state.progressLength.forEach((x) => {
        Percentage += x;
      });
      Percentage = Percentage / state.progressLength.length;
      state.result = `Average Percentage is: ${Percentage.toFixed(2)}`;
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
  resetWaveform,
  setSpeech,
} = gameSlice.actions;
export default gameSlice.reducer;
