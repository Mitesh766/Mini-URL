import { createSlice } from "@reduxjs/toolkit";

const urlSlice = createSlice({
  name: "url",
  initialState: {
    urls: [],
    isLoading: false,
  },
  reducers: {
    setUrlData: (state, action) => {
      state.urls = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUrlData, setLoading } = urlSlice.actions;

export default urlSlice.reducer;
