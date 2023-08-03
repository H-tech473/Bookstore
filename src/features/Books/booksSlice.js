import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchBooks, fetchGenre } from './booksAPI';

const initialState = {
  books: [],
  status: 'idle',
};


export const fetchAsync = createAsyncThunk(
  'books/fetchbooks',
  async () => {
    const response = await fetchBooks();
    let array = response.data;
    let currentIndex = array.length,  randomIndex;
    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
    return array;
  }
);
export const fetgenreAsync = createAsyncThunk(
  'books/fetchgenre',
  async () => {
    const response = await fetchGenre();
    return response.data;
  }
);


export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    filterByenre: (state, action) => {
      state.books = state.books.filter(elem => elem.category === action.payload)
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
      })
      .addCase(fetgenreAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetgenreAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.genre = action.payload;
      });
  },
});

export const { filterByenre, decrement, incrementByAmount } = booksSlice.actions;

export default booksSlice.reducer;
