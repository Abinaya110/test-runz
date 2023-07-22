import { createSlice } from "@reduxjs/toolkit";
import { SettingsReducerState, UpdateReducerState } from "./settings.types";
import {
  getSettingMiddleWare,
  postSettingMiddleWare,
  updateSettingMiddleWare,
} from "./settingsMiddleware";

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
      state.data = action.payload[0];
    });
    builder.addCase(getSettingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const postSettingsInitialState: UpdateReducerState = {
  isLoading: false,
  error: "",
};
const postSettingsReducer = createSlice({
  name: "settings_post",
  initialState: postSettingsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postSettingMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(postSettingMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(postSettingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

const updateSettingsInitialState: UpdateReducerState = {
  isLoading: false,
  error: "",
};
const updateSettingsReducer = createSlice({
  name: "settings_update",
  initialState: updateSettingsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateSettingMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(updateSettingMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateSettingMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getSettingsReducers = getSettingsReducer.reducer;
export const postSettingsReducers = postSettingsReducer.reducer;
export const updateSettingsReducers = updateSettingsReducer.reducer;
