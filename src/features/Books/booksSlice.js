import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from './booksAPI';
// import axios from 'axios';

const initialState = {
  books: [],
  status: 'idle',
};


export const fetchAsync = createAsyncThunk(
  'books/fetchbooks',
  async (amount) => {
    const response = await fetchBooks();
    return response.data;
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    increment: (state) => {
      state.books += 1;
    },
    decrement: (state) => {
      state.books -= 1;
    },
    incrementByAmount: (state, action) => {
      state.books += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.books = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = booksSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectCount(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default booksSlice.reducer;
