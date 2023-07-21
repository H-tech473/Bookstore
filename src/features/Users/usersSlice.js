import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from './usersAPI';

const initialState = {
  user: {id: -1},
  status: 'idle',
};


export const fetchuAsync = createAsyncThunk(
  'books/fetchuser',
  async (id) => {
    const response = await fetchUsers(id);
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
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
      .addCase(fetchuAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchuAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = usersSlice.actions;

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

export default usersSlice.reducer;
