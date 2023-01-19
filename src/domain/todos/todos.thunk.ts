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
  async (todoId: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.get(
        `${process.env.REACT_APP_API ?? ""}/todos/${todoId}/items`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.data?.auth_token}`,
          },
        }
      );

      return {
        result,
        todoId,
      };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue({ error: err.response, todoId });
      }
      return rejectWithValue({ error: err, todoId });
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
export const editItem = createAsyncThunk(
  "todos/editItem",
  async (
    {
      todoId,
      itemId,
      body,
    }: {
      todoId: number;
      itemId: number;
      body: { name: string; progress_percentage: string };
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.patch(
        `${process.env.REACT_APP_API ?? ""}/todos/${todoId}/items/${itemId}`,
        { ...body, target_todo_id: todoId },
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
export const deleteItem = createAsyncThunk(
  "todos/deleteItem",
  async (
    { todoId, itemId }: { todoId: number; itemId: number },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as unknown as RootState;
      const result = await axios.delete(
        `${process.env.REACT_APP_API ?? ""}/todos/${todoId}/items/${itemId}`,
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

export const moveItem = createAsyncThunk(
  "todos/moveItem",
  async (
    {
      todoId,
      itemId,
      move,
    }: {
      todoId: number;
      itemId: number;
      move: number;
    },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as unknown as RootState;

      const body = state.todos.items
        .filter((todo) => todo.id === todoId)[0]
        .data.filter((item) => item.id === itemId);

      const targetTodoId =
        state.todos.todos?.[
          state.todos.items.findIndex((todo) => todo.id === todoId) + move
        ]?.id ?? 0;

      const result = await axios.patch(
        `${process.env.REACT_APP_API ?? ""}/todos/${todoId}/items/${itemId}`,
        { ...body, target_todo_id: targetTodoId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${state.auth.data?.auth_token}`,
          },
        }
      );
      return { result, todoId };
    } catch (err) {
      if (err instanceof AxiosError) {
        return rejectWithValue(err.response);
      }
      return rejectWithValue(err);
    }
  }
);
