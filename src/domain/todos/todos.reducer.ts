import { createSlice } from "@reduxjs/toolkit";
import { getTodos, getItems, postItem, deleteItem } from "./todos.thunk";
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
  isLoadingDeleteItem: false,
  deleteItem: null,
  errorDeleteItem: null,
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
    resetDeleteItem: (state) => {
      state.isLoadingDeleteItem = false;
      state.deleteItem = null;
      state.errorDeleteItem = null;
    },
    addItem: (state, { payload }) => {
      state.items = state.items.map((item, index) =>
        payload.indexTodos === index
          ? { ...item, data: [...item.data, payload.item] }
          : item
      );
    },
    removeItem: (state, { payload }) => {
      state.items = state.items.map((item, index) =>
        index === payload.todoIndex
          ? {
              ...item,
              data: item.data.filter((dt) => dt.id !== payload.itemId),
            }
          : item
      );
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
      state.items = [
        ...state.items,
        {
          id: state.todos?.[payload.indexTodos].id ?? 0,
          data: payload.result.data,
        },
      ].filter(
        (item, i, self) =>
          self.findIndex((subitem) => subitem.id === item.id) === i
      );
      const newIndex = payload.indexTodos + 1;
      if (state.todos?.length ?? 0 > newIndex) {
        state.gettingIndexItem = newIndex;
      } else {
        state.gettingIndexItem = null;
      }
    });
    builder.addCase(getItems.rejected, (state, { payload }) => {
      state.isLoadingItems = false;
      state.errorItems = [
        ...state.errorItems,
        (payload as { error: unknown }).error,
      ];
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
    builder.addCase(deleteItem.pending, (state) => {
      state.isLoadingDeleteItem = true;
      state.deleteItem = null;
      state.errorDeleteItem = null;
    });
    builder.addCase(deleteItem.fulfilled, (state, { payload }) => {
      state.isLoadingDeleteItem = false;
      state.deleteItem = payload.data || payload;
    });
    builder.addCase(deleteItem.rejected, (state, { payload }) => {
      state.isLoadingDeleteItem = false;
      state.errorDeleteItem = payload;
    });
  },
});

export const {
  resetGetTodos,
  resetCreateItem,
  resetDeleteItem,
  addItem,
  removeItem,
} = todosSlice.actions;

export default todosSlice.reducer;
