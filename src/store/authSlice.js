import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
      } else {
        return rejectWithValue('Signup failed: Invalid response from server');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred during signup');
    }
  }
);

export const sendOTP = createAsyncThunk(
  'auth/sendOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/otp', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred while sending OTP');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return response.data;
      } else {
        return rejectWithValue('Login failed: Invalid response from server');
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred during login');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    },
    setToken: (state, action) => {
      if (action.payload) {
        state.isAuthenticated = true;
        api.defaults.headers.common['Authorization'] = `Bearer ${action.payload}`;
      } else {
        state.isAuthenticated = false;
        delete api.defaults.headers.common['Authorization'];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
      })
      .addCase(sendOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOTP.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;