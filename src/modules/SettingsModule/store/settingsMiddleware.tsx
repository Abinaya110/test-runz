import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  AUTH_CREATE,
  AUTH_DISABLE,
  GET_SETTINGS,
  GET_USER_LIST,
  GET_USER_LIST_UPDATE,
  POST_SETTINGS,
  UPDATE_SETTINGS,
} from "../../../redux/actions";
import {
  authCreateApi,
  authDisableApi,
  getUserListApi,
  getUserListUpdateApi,
  settingApi,
  settingUpdateApi,
} from "../../../routes/apiRoutes";
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
  async (
    {
      id,
      notification,
      roleSetting,
    }: { id: string; notification?: any; roleSetting?: any },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(settingUpdateApi(id), {
        notification,
        roleSetting,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getUserListMiddleWare = createAsyncThunk(
  GET_USER_LIST,
  async (_a, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getUserListApi);
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getUserListUpdateMiddleWare = createAsyncThunk(
  GET_USER_LIST_UPDATE,
  async (
    { id, activeStatus }: { id: string; activeStatus: boolean },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(getUserListUpdateApi(id), {
        activeStatus,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authCreateMiddleWare = createAsyncThunk(
  AUTH_CREATE,
  async (
    {
      firstName,
      lastName,
      email,
      organization,
      department,
      lab,
      role,
      activeStatus,
    }: {
      firstName: string;
      lastName: string;
      email: string;
      organization: string;
      department: string[];
      lab: string[];
      role: string;
      activeStatus: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(authCreateApi, {
        lastName,
        firstName,
        email,
        lab,
        organization,
        department,
        role,
        activeStatus,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const authDisableMiddleWare = createAsyncThunk(
  AUTH_DISABLE,
  async ({ id }: { id: string[] }, { rejectWithValue }) => {
    try {
      const { data } = await axios.patch(authDisableApi, {
        id,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
