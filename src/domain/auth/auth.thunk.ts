import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const postLogin = createAsyncThunk(
  "auth/login",
  async (body: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API ?? ""}/auth/login`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
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
export const postRegister = createAsyncThunk(
  "auth/register",
  async (
    body: {
      name: string;
      email: string;
      password: string;
      password_confirmation: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_API ?? ""}/signup`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
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
