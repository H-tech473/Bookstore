import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdmin, updatePatch} from './adminsAPI';
import {updateuserPatch} from '../Users/usersAPI';
 
const initialState = {
  status: 'idle',
};


export const fetchAsync = createAsyncThunk(
  'admins/fetchadmin',
  async () => {
    const response = await fetchAdmin();
    return response.data;
  }
);

export const updateAsync = createAsyncThunk(
  'admins/updateadmin',
  async (action) => {
    const {data} = await fetchAdmin();
    const dt = new Date();
    await updateuserPatch({id: action.issuer, change: {latestissuedate: dt.toISOString()}})
    const response = await updatePatch({requests: [...data.requests,{...action, reqid: data.latestrequest }], latestrequest: data.latestrequest+1});
    return response.data;
  }
);

export const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    Addrequest: (state, action) => {
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
      })
      .addCase(updateAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      });
  },
});

export const { Addrequest, decrement, incrementByAmount } = adminsSlice.actions;

export default adminsSlice.reducer;
