import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';
import axios from 'axios';

export const createRecipe = createAsyncThunk(
  'recipe/createRecipe',
  async (recipeData, { rejectWithValue }) => {
    try {
      const response = await api.post('/recipe/create-recipe', recipeData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllRecipes = createAsyncThunk(
  'recipe/getAllRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:3000/api/recipe/getAllRecipes');
      console.log(" Response, ", response);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchRecipes = createAsyncThunk(
  'recipe/searchRecipes',
  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/search?query=${query}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecipesByCategory = createAsyncThunk(
  'recipe/getRecipesByCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/category/${categoryId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getRecipeById = createAsyncThunk(
  'recipe/getRecipeById',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/recipe/${recipeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipe/updateRecipe',
  async ({ recipeId, recipeData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/recipe/${recipeId}`, recipeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipe/deleteRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      await api.delete(`/recipe/${recipeId}`);
      return recipeId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    recipes: [],
    currentRecipe: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    currentUser: null,
    recipesLoading: false,
    createRecipeLoading: false,
    createRecipeError: null,
    getAllRecipesLoading: false,
    getAllRecipesError: null,
    searchRecipesLoading: false,
    searchRecipesError: null,
    getRecipesByCategoryLoading: false,
    getRecipesByCategoryError: null,
    getRecipeByIdLoading: false,
    getRecipeByIdError: null,
    updateRecipeLoading: false,
    updateRecipeError: null,
    deleteRecipeLoading: false,
    deleteRecipeError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllRecipes.pending, (state) => {
        state.getAllRecipesLoading = true;
        state.getAllRecipesError = null;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.getAllRecipesLoading = false;
        state.recipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.getAllRecipesLoading = false;
        state.getAllRecipesError = action.payload;
      })
      .addCase(getRecipeById.pending, (state) => {
        state.getRecipeByIdLoading = true;
        state.getRecipeByIdError = null;
      })
      .addCase(getRecipeById.fulfilled, (state, action) => {
        state.getRecipeByIdLoading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(getRecipeById.rejected, (state, action) => {
        state.getRecipeByIdLoading = false;
        state.getRecipeByIdError = action.payload;
      })
      .addCase(deleteRecipe.pending, (state) => {
        state.deleteRecipeLoading = true;
        state.deleteRecipeError = null;
      })
      .addCase(deleteRecipe.fulfilled, (state, action) => {
        state.deleteRecipeLoading = false;
        state.recipes = state.recipes.filter(recipe => recipe._id !== action.payload);
      })
      .addCase(deleteRecipe.rejected, (state, action) => {
        state.deleteRecipeLoading = false;
        state.deleteRecipeError = action.payload;
      })
      .addCase(createRecipe.pending, (state) => {
        state.createRecipeLoading = true;
        state.createRecipeError = null;
      })
      .addCase(createRecipe.fulfilled, (state, action) => {
        state.createRecipeLoading = false;
        state.recipes.push(action.payload);
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.createRecipeLoading = false;
        state.createRecipeError = action.payload;
      })
      .addCase(updateRecipe.pending, (state) => {
        state.updateRecipeLoading = true;
        state.updateRecipeError = null;
      })
      .addCase(updateRecipe.fulfilled, (state, action) => {
        state.updateRecipeLoading = false;
        const index = state.recipes.findIndex(recipe => recipe._id === action.payload._id);
        if (index !== -1) {
          state.recipes[index] = action.payload;
        }
        if (state.currentRecipe && state.currentRecipe._id === action.payload._id) {
          state.currentRecipe = action.payload;
        }
      })
      .addCase(updateRecipe.rejected, (state, action) => {
        state.updateRecipeLoading = false;
        state.updateRecipeError = action.payload;
      })
      .addCase(searchRecipes.pending, (state) => {
        state.searchRecipesLoading = true;
        state.searchRecipesError = null;
      })
      .addCase(searchRecipes.fulfilled, (state, action) => {
        state.searchRecipesLoading = false;
        state.recipes = action.payload;
      })
      .addCase(searchRecipes.rejected, (state, action) => {
        state.searchRecipesLoading = false;
        state.searchRecipesError = action.payload;
      })
      .addCase(getRecipesByCategory.pending, (state) => {
        state.getRecipesByCategoryLoading = true;
        state.getRecipesByCategoryError = null;
      })
      .addCase(getRecipesByCategory.fulfilled, (state, action) => {
        state.getRecipesByCategoryLoading = false;
        state.recipes = action.payload;
      })
      .addCase(getRecipesByCategory.rejected, (state, action) => {
        state.getRecipesByCategoryLoading = false;
        state.getRecipesByCategoryError = action.payload;
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

export default recipeSlice.reducer;
