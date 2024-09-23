import { configureStore } from '@reduxjs/toolkit';
import authReducer from './store/authSlice';
import recipeReducer from './store/recipeSlice';
import categoryReducer from './store/categorySlice';
import commentReducer from './store/commentSlice';
import userReducer from './store/userSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
    category: categoryReducer,
    comment: commentReducer,
    user: userReducer,
  },
});

export default store;
