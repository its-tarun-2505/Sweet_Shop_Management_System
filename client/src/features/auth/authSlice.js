import { createSlice } from "@reduxjs/toolkit";
import { login, register, getMe } from './authController';

const token = localStorage.getItem('token');

const initialState = {
  user: null,
  token: token || null,
  isLoading: false,
  isError: false,
  message: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.message = "";
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.token;
        localStorage.setItem('token', state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.data.token;
        localStorage.setItem("token", state.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // getMe
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(getMe.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
