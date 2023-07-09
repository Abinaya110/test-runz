import { createSlice } from "@reduxjs/toolkit";
import { signUpMiddleWare } from "./loginMiddleware";
import type { signUpReducerState } from "./login.types";

const signUpInitialState: signUpReducerState = {
  isLoading: false,
  error: "",
};

const signUpReducer = createSlice({
  name: "signUp",
  initialState: signUpInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(signUpMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(signUpMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const signUpReducers = signUpReducer.reducer;
