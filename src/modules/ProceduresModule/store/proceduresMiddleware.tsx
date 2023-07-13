import { createAsyncThunk } from "@reduxjs/toolkit";
import { PROCEDURE_LIST } from "../../../redux/actions";
import axios from "axios";
import { procedureApi } from "../../../routes/apiRoutes";

export const procedureMiddleWare = createAsyncThunk(
  PROCEDURE_LIST,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(procedureApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
