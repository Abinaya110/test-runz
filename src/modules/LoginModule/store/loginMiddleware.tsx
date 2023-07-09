import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SIGNUP } from "../../../redux/actions";
import { signUpApi } from "../../../routes/apiRoutes";

export const signUpMiddleWare = createAsyncThunk(
  SIGNUP,
  async (
    {
      email,
      password,
      name,
    }: { name: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      const { data } = await axios.post(signUpApi, {
        email,
        password,
        name,
      });
      return data;
    } catch (error: any) {
      const typedError = error as Error;
      return rejectWithValue(typedError);
    }
  }
);
