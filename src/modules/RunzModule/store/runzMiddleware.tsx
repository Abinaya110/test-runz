import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getRunzListApi, getRunzListDetails } from "../../../routes/apiRoutes";
import {
  RUNZ_CREATE,
  RUNZ_GET_DETAILS,
  RUNZ_GET_LIST,
} from "../../../redux/actions";

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

export const getRunzCreateMiddleWare = createAsyncThunk(
  RUNZ_CREATE,
  async (
    {
      procedureId,
      procedurename,
      testobjective,
      dueDate,
      assignTo,
    }: {
      procedureId: string;
      procedurename: string;
      testobjective: string;
      dueDate: string;
      assignTo: [
        {
          userId: String;
          date: String;
        }
      ];
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(getRunzListApi, {
        procedureId,
        procedurename,
        testobjective,
        dueDate,
        assignTo,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);

export const getRunzListDetailsMiddleWare = createAsyncThunk(
  RUNZ_GET_DETAILS,
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(getRunzListDetails(id));
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
