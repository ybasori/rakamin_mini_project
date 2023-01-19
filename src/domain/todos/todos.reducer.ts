import { createSlice } from "@reduxjs/toolkit";
import {
  getTodos,
  getItems,
  postItem,
  deleteItem,
  editItem,
  moveItem,
} from "./todos.thunk";
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
  isLoadingEditItem: false,
  editItem: null,
  errorEditItem: null,
  isLoadingMoveItem: false,
  moveItem: null,
  errorMoveItem: null,
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
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
      state.items = state.items.map((item) =>
        payload.todoId === item.id
          ? { ...item, data: [...item.data, payload.item] }
          : item
      );
    },
    removeItem: (state, { payload }) => {
      state.items = state.items.map((item) =>
        item.id === payload.todoId
          ? {
              ...item,
              data: item.data.filter((dt) => dt.id !== payload.itemId),
            }
          : item
      );
    },
    updateItem: (state, { payload }) => {
      state.items = state.items.map((item) =>
        payload.todoId === item.id
          ? {
              ...item,
              data: [
                ...item.data.map((subItem) =>
                  subItem.id === payload.itemId ? payload.item : subItem
                ),
              ],
            }
          : item
      );
    },
    resetEditItem: (state) => {
      state.isLoadingEditItem = false;
      state.editItem = null;
      state.errorEditItem = null;
    },
    resetMoveItem: (state) => {
      state.isLoadingMoveItem = false;
      state.moveItem = null;
      state.errorMoveItem = null;
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
          id: payload.todoId,
          data: payload.result.data,
        },
      ].filter(
        (item, i, self) =>
          self.findIndex((subitem) => subitem.id === item.id) === i
      );

      const newIndex =
        (state.todos?.findIndex((item) => item.id === payload.todoId) ?? 0) + 1;
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
    builder.addCase(editItem.pending, (state) => {
      state.isLoadingEditItem = true;
      state.editItem = null;
      state.errorEditItem = null;
    });
    builder.addCase(editItem.fulfilled, (state, { payload }) => {
      state.isLoadingEditItem = false;
      state.editItem = payload.data;
    });
    builder.addCase(editItem.rejected, (state, { payload }) => {
      state.isLoadingEditItem = false;
      state.errorEditItem = payload;
    });
    builder.addCase(moveItem.pending, (state) => {
      state.isLoadingMoveItem = true;
      state.moveItem = null;
      state.errorMoveItem = null;
    });
    builder.addCase(moveItem.fulfilled, (state, { payload }) => {
      state.isLoadingMoveItem = false;
      state.moveItem = payload.result.data;
      const newTodoId = payload.result.data.todo_id;
      state.items = state.items.map((todo) =>
        todo.id === payload.todoId
          ? {
              ...todo,
              data: [
                ...todo.data.filter(
                  (item) => item.id !== payload.result.data.id
                ),
              ],
            }
          : todo.id === newTodoId
          ? { ...todo, data: [...todo.data, payload.result.data] }
          : todo
      );
    });
    builder.addCase(moveItem.rejected, (state, { payload }) => {
      state.isLoadingMoveItem = false;
      state.errorMoveItem = payload;
    });
  },
});

export const {
  resetCreateItem,
  resetDeleteItem,
  addItem,
  removeItem,
  resetEditItem,
  updateItem,
  resetMoveItem,
} = todosSlice.actions;

export default todosSlice.reducer;
