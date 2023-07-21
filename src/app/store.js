import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import usersReducer from '../features/Users/usersSlice';

export const store = configureStore({
  reducer: {
    book: booksReducer,
    users: usersReducer
  },
});
