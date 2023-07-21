import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_SETTINGS,
  POST_SETTINGS,
  UPDATE_SETTINGS,
} from "../../../redux/actions";
import { settingApi, settingUpdateApi } from "../../../routes/apiRoutes";
import axios from "axios";

export const getSettingMiddleWare = createAsyncThunk(
  GET_SETTINGS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(settingApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const postSettingMiddleWare = createAsyncThunk(
  POST_SETTINGS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(settingUpdateApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const updateSettingMiddleWare = createAsyncThunk(
  UPDATE_SETTINGS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(settingUpdateApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);