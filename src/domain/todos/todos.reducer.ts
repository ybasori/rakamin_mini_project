import { createSlice } from "@reduxjs/toolkit";
import { getTodos } from "./todos.thunk";
import { ITODOS } from "./todos.type";

const initialState: ITODOS = {
  isLoadingTodos: false,
  todos: null,
  errorTodos: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    resetGetTodos: (state) => {
      state.isLoadingTodos = false;
      state.todos = null;
      state.errorTodos = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state) => {
      state.isLoadingTodos = true;
      state.todos = null;
    });
    builder.addCase(getTodos.fulfilled, (state, { payload }) => {
      state.isLoadingTodos = false;
      state.todos = payload.data;
    });
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      state.isLoadingTodos = false;
      state.errorTodos = payload;
    });
  },
});

export const { resetGetTodos } = todosSlice.actions;

export default todosSlice.reducer;
