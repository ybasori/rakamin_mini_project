import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { RootState } from "../../store";

export const getTodos = createAsyncThunk(
  "todos/getTodos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.get(
        `${process.env.REACT_APP_API ?? ""}/todos`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.data?.auth_token}`,
          },
        }
      );
      return result;
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response);
      }
      return rejectWithValue(err);
    }
  }
);
