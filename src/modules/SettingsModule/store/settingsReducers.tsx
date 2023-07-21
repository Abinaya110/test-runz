import { createSlice } from "@reduxjs/toolkit";
import { SettingsReducerState } from "./settings.types";
import { getSettingMiddleWare } from "./settingsMiddleware";

const settingsInitialState: SettingsReducerState = {
  isLoading: false,
  error: "",
};

const getSettingsReducer = createSlice({
  name: "settings_list",
  initialState: settingsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSettingMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getSettingMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(getSettingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getSettingsReducers = getSettingsReducer.reducer;
