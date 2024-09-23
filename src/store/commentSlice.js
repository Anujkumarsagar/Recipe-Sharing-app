import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ recipeId, content }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/comment/${recipeId}`, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCommentsByRecipe = createAsyncThunk(
  'comment/getCommentsByRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/comment/${recipeId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateComment = createAsyncThunk(
  'comment/updateComment',
  async ({ commentId, content }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/comment/${commentId}`, { content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      await api.delete(`/comment/${commentId}`);
      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsByRecipe.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        const index = state.comments.findIndex(comment => comment._id === action.payload._id);
        if (index !== -1) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(comment => comment._id !== action.payload);
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

export default commentSlice.reducer;
