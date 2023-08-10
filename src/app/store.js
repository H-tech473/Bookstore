import { configureStore } from '@reduxjs/toolkit';
import booksReducer from '../features/Books/booksSlice';
import usersReducer from '../features/Users/usersSlice';
import adminReducer from '../features/Admin/adminsSlice';

export const store = configureStore({
  reducer: {
    book: booksReducer,
    user: usersReducer,
    admin: adminReducer
  },
});
