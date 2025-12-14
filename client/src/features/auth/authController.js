import api from '../../utils/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Login Failed!'
      );
    }
  }
);

const register = createAsyncThunk(
  'auth/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration Failed!'
      );
    }
  }
);

// ✅ CORRECT /me
const getMe = createAsyncThunk(
  'auth/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch user!'
      );
    }
  }
);

export {
  login,
  register,
  getMe
};
