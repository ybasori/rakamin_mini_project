import { createSlice } from "@reduxjs/toolkit";
import { postLogin, postRegister } from "./auth.thunk";
import { IAuth } from "./auth.type";

const initialState: IAuth = {
  isLoadingAuth: false,
  data: null,
  errorAuth: null,
  isLoadingRegister: false,
  register: null,
  errorRegister: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: (state) => {
      state.data = null;
      state.errorAuth = null;
      state.isLoadingAuth = false;
    },
    resetRegister: (state) => {
      state.isLoadingRegister = false;
      state.register = null;
      state.errorRegister = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postLogin.pending, (state) => {
      state.isLoadingAuth = true;
    });
    builder.addCase(postLogin.fulfilled, (state, { payload }) => {
      state.isLoadingAuth = false;
      state.data = payload.data;
    });
    builder.addCase(postLogin.rejected, (state, { payload }) => {
      state.isLoadingAuth = false;
      state.errorAuth = payload;
    });
    builder.addCase(postRegister.pending, (state) => {
      state.isLoadingRegister = true;
    });
    builder.addCase(postRegister.fulfilled, (state, { payload }) => {
      state.isLoadingRegister = false;
      state.register = payload.data;
    });
    builder.addCase(postRegister.rejected, (state, { payload }) => {
      state.isLoadingRegister = false;
      state.errorRegister = payload;
    });
  },
});

export const { resetAuth, resetRegister } = authSlice.actions;

export default authSlice.reducer;
