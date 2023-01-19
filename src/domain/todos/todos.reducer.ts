import { createSlice } from "@reduxjs/toolkit";
import { getTodos, getItems, postItem } from "./todos.thunk";
import { ITODOS } from "./todos.type";

const initialState: ITODOS = {
  isLoadingTodos: false,
  todos: null,
  errorTodos: null,
  isLoadingItems: false,
  items: [],
  errorItems: [],
  gettingIndexItem: null,
  isLoadingCreateItem: false,
  createItem: null,
  errorCreateItem: null,
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
    resetCreateItem: (state) => {
      state.isLoadingCreateItem = false;
      state.createItem = null;
      state.errorCreateItem = null;
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
      state.isLoadingItems = false;
      if (payload.ai) {
        state.items = [
          ...state.items,
          {
            id: state.todos?.[payload.indexTodos].id ?? 0,
            data: payload.result.data,
          },
        ];
        const newIndex = payload.indexTodos + 1;
        if (state.todos?.length ?? 0 > newIndex) {
          state.gettingIndexItem = newIndex;
        } else {
          state.gettingIndexItem = null;
        }
      } else {
        state.items = state.items.map((item, index) =>
          index === payload.indexTodos ? payload.result.data : item
        );
        state.gettingIndexItem = null;
      }
    });
    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.isLoadingItems = false;
      if ((payload as { ai: boolean }).ai) {
        state.errorItems = [
          ...state.errorItems,
          (payload as { error: unknown }).error,
        ];
      } else {
        state.errorItems = state.errorItems.map((item, index) =>
          index === (state.gettingIndexItem ?? 0)
            ? (payload as { error: unknown }).error
            : item
        );
      }
    });
    builder.addCase(postItem.pending, (state) => {
      state.isLoadingCreateItem = true;
      state.createItem = null;
      state.errorCreateItem = null;
    });
    builder.addCase(postItem.fulfilled, (state, { payload }) => {
      state.isLoadingCreateItem = false;
      state.createItem = payload.data;
    });
    builder.addCase(postItem.rejected, (state, { payload }) => {
      state.isLoadingCreateItem = false;
      state.errorCreateItem = payload;
    });
  },
});

export const { resetGetTodos, resetCreateItem } = todosSlice.actions;

export default todosSlice.reducer;
