import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = {
  currentUser: null,
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  recipes: [],
  favorites: [],
  categories: [],
  profileLoading: false,
  recipesLoading: false,
  theme: localStorage.getItem('theme') || 'light-mode'
};

export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/profile");
      return response.data.Object;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
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
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const login = createAsyncThunk(
  'user/login',
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
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const getUserRecipes = createAsyncThunk(
  'user/getUserRecipes',
  async (_, { getState, rejectWithValue }) => {
    const { isAuthenticated } = getState().user;
    if (!isAuthenticated) {
      return rejectWithValue('Please log in to view your recipes.');
    }
    try {
      const response = await api.get('/user/profile');
      console.log("the output in uesrslcie of get uer recipes", response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const addToFavorites = createAsyncThunk(
  'user/addToFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/add-favorite', { recipeId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const removeFromFavorites = createAsyncThunk(
  'user/removeFromFavorites',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.post('/user/remove-favorite', { recipeId });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const getProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('user/profile');
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch profile');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'user/update-profile',
  async (profileData, { rejectWithValue }) => {
    try {
      console.log("profileData in updateProfile", profileData);
      const formData = new FormData();
      Object.entries(profileData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formData in updateProfile", formData);
      const response = await api.put('/user/update-profile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
      document.documentElement.classList.toggle('light', state.theme === 'light');
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', state.theme);
      document.documentElement.classList.toggle('dark', state.theme === 'dark');
      document.documentElement.classList.toggle('light', state.theme === 'light');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.profileLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.profileLoading = false;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload || 'Failed to fetch user profile';
        state.currentUser = null;
        state.isAuthenticated = false;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Sign up failed';
        state.isAuthenticated = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      })
      .addCase(getUserRecipes.pending, (state) => {
        state.recipesLoading = true;
        state.error = null;
      })
      .addCase(getUserRecipes.fulfilled, (state, action) => {
        state.recipes = action.payload;
        state.isAuthenticated = true;
        state.recipesLoading = false;
      })
      .addCase(getUserRecipes.rejected, (state, action) => {
        state.recipesLoading = false;
        state.error = action.payload;
        state.recipes = [];
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(fav => fav._id !== action.payload._id);
      })
      .addCase(getProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.profileLoading = false;
        state.recipes = action.payload.recipes; // Ensure user recipes are updated when profile is fetched
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.profileLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isAuthenticated = true;
        state.profileLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.profileLoading = false;
        state.error = action.payload;
      });
  }
});

export const { logout, toggleTheme, setTheme } = userSlice.actions;
export default userSlice.reducer;
