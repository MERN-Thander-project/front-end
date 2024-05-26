import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { postApi } from '../services/post';
import { tegsApi } from '../services/tegs';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [tegsApi.reducerPath]: tegsApi.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(postApi.middleware)
      .concat(tegsApi.middleware),
});

// Настройка слушателей событий для автоматического refetching
setupListeners(store.dispatch);