// store/slices/darkThemeSlice.js

import { createSlice } from "@reduxjs/toolkit";

export const darkThemeSlice = createSlice({
  name: "darkTheme",
  initialState: {
    isDarkTheme: false,
  },
  reducers: {
    setDarkTheme: (state, action) => {
      state.isDarkTheme = action.payload;
    },
  },
});

export const { setDarkTheme } = darkThemeSlice.actions;

export default darkThemeSlice.reducer;
