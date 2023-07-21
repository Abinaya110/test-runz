import { createAsyncThunk } from "@reduxjs/toolkit";
import { GET_SETTINGS } from "../../../redux/actions";
import { settingApi } from "../../../routes/apiRoutes";
import axios from "axios";

export const getSettingMiddleWare = createAsyncThunk(
  GET_SETTINGS,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(settingApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
