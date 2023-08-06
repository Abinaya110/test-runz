import { createSlice } from "@reduxjs/toolkit";
import { getRunzListMiddleWare } from "./runzMiddleware";

const getRunzListInitialState: any = {
  isLoading: false,
  error: "",
};

const getRunzListReducer = createSlice({
  name: "getRunzList_list",
  initialState: getRunzListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRunzListMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getRunzListMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRunzListMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getRunzListReducers = getRunzListReducer.reducer;
