import { createSlice } from "@reduxjs/toolkit";
import { ProceduresReducerState } from "./procedures.types";
import { procedureMiddleWare } from "./proceduresMiddleware";

const authMeInitialState: ProceduresReducerState = {
  isLoading: false,
  error: "",
  data: {
    user: {
      _id: "",
      email: "",
      userId: "",
      __v: 0,
      createdAt: "",
      name: "",
      organization: "",
      role: "",
      updatedAt: "",
      userCounter: "",
    },
  },
};

const procedureReducer = createSlice({
  name: "procedure_list",
  initialState: authMeInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(procedureMiddleWare.pending, (state) => {
      state.isLoading = true;
      state.error = "";
    });
    builder.addCase(procedureMiddleWare.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(procedureMiddleWare.rejected, (state, action) => {
      state.isLoading = false;
      if (typeof action.payload === "string") {
        state.error = action.payload;
      }
    });
  },
});

export const procedureReducers = procedureReducer.reducer;
