import { createSlice } from "@reduxjs/toolkit";
import { login, register } from './authController.js';

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
            localStorage.removeItem('token');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.message;
                state.token = action.payload.data.token;
                localStorage.setItem('token', state.token);
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message =  action.payload;
            })
            .addCase(register.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isError = false;
                state.isLoading = false;
                state.message = action.payload.message;
                state.token = action.payload.data.token;
                localStorage.setItem('token', state.token);
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message =  action.payload;
            });
    }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer; 