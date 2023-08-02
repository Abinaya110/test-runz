import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  PROCEDURE_CREATE,
  PROCEDURE_DELETE,
  PROCEDURE_ID_LIST,
  PROCEDURE_LIST,
  PROCEDURE_UPDATE,
} from "../../../redux/actions";
import axios from "axios";
import {
  procedureApi,
  procedureByIdApi,
  procedureUpdateAndDeleteApi,
} from "../../../routes/apiRoutes";

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

export const procedureCreateMiddleWare = createAsyncThunk(
  PROCEDURE_CREATE,
  async (
    {
      title,
      html,
      createdBy,
    }: { title: string; html: string; createdBy: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(procedureApi, {
        title,
        html,
        createdBy,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureByIdMiddleWare = createAsyncThunk(
  PROCEDURE_ID_LIST,
  async ({ id }: { id: any }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(procedureByIdApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureUpdateMiddleWare = createAsyncThunk(
  PROCEDURE_UPDATE,
  async (
    { id, html, title }: { id: any; title: any; html: any },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.patch(procedureUpdateAndDeleteApi(id), {
        title,
        html,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const procedureDeleteMiddleWare = createAsyncThunk(
  PROCEDURE_DELETE,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(procedureUpdateAndDeleteApi(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
