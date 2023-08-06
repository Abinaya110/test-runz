import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getRunzListApi } from "../../../routes/apiRoutes";
import { RUNZ_GET_LIST } from "../../../redux/actions";

export const getRunzListMiddleWare = createAsyncThunk(
  RUNZ_GET_LIST,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getRunzListApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
