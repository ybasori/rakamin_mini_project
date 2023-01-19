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

export const getItems = createAsyncThunk(
  "todos/getItems",
  async (
    { indexTodos, ai }: { indexTodos: number; ai: boolean },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.get(
        `${process.env.REACT_APP_API ?? ""}/todos/${
          state.todos.todos?.[indexTodos].id
        }/items`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.data?.auth_token}`,
          },
        }
      );
      return { result, ai, indexTodos };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue({ error: err.response, ai });
      }
      return rejectWithValue({ error: err, ai });
    }
  }
);

export const postItem = createAsyncThunk(
  "todos/postItem",
  async (
    {
      todoId,
      body,
    }: { todoId: number; body: { name: string; progress_percentage: string } },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.post(
        `${process.env.REACT_APP_API ?? ""}/todos/${todoId}/items`,
        body,
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
