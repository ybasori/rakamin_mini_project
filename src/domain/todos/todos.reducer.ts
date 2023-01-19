import { createSlice } from "@reduxjs/toolkit";
import { getTodos, getItems } from "./todos.thunk";
import { ITODOS } from "./todos.type";

const initialState: ITODOS = {
  isLoadingTodos: false,
  todos: null,
  errorTodos: null,
  isLoadingItems: false,
  items: [],
  errorItems: [],
  gettingIndexItem: null,
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
      if (payload.data.length > 0) {
        state.gettingIndexItem = 0;
      }
    });
    builder.addCase(getTodos.rejected, (state, { payload }) => {
      state.isLoadingTodos = false;
      state.errorTodos = payload;
    });
    builder.addCase(getItems.pending, (state) => {
      state.isLoadingItems = true;
    });
    builder.addCase(getItems.fulfilled, (state, { payload }) => {
      state.items = [...state.items, payload.data];
      state.isLoadingItems = false;
      const newIndex = (state.gettingIndexItem ?? 0) + 1;
      if (payload.data.length > newIndex) {
        state.gettingIndexItem = newIndex;
      }
    });
    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.isLoadingItems = false;
      state.errorItems = [...state.errorItems, payload];
    });
  },
});

export const { resetGetTodos } = todosSlice.actions;

export default todosSlice.reducer;
