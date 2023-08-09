import { createSlice } from "@reduxjs/toolkit";
import {
  getRunzListDetailsMiddleWare,
  getRunzListMiddleWare,
} from "./runzMiddleware";
import { RunzDetailsReducerState, RunzListReducerState } from "./runz.types";

const getRunzListInitialState: RunzListReducerState = {
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

const getRunzListDetailsInitialState: RunzDetailsReducerState = {
  isLoading: false,
  error: "",
  data: {
    experiment: {
      _id: "",
      procedureId: "",
      procedurename: "",
      testobjective: "",
      dueDate: "",
      status: "",
      createdAt: "",
      updatedAt: "",
      __v: 0,
    },
  },
};

const getRunzListDetailsReducer = createSlice({
  name: "getRunzListDetails_list",
  initialState: getRunzListDetailsInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRunzListDetailsMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(getRunzListDetailsMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getRunzListDetailsMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const getRunzListReducers = getRunzListReducer.reducer;
export const getRunzListDetailsReducers = getRunzListDetailsReducer.reducer;
