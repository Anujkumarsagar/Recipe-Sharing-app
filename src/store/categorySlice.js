import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/category/create', categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/category/all');
      console.log("response.data of category all",response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  'category/getCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  'category/updateCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/category/${categoryId}`, categoryData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  'category/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      await api.delete(`/category/${categoryId}`);
      return categoryId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.currentCategory = action.payload; // Adjusted this line to directly set currentCategory
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload); // Add newly created category to the list
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category._id === action.payload._id);
        if (index !== -1) {
          state.categories[index] = action.payload; // Update the category in the list
        }
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category._id !== action.payload);
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default categorySlice.reducer;
