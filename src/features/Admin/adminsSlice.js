import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAdmin, updatePatch} from './adminsAPI';
import {updateuserPatch, fetchallUser, fetchUsers} from '../Users/usersAPI';
import {fetchBooks, fetchGenre} from '../Books/booksAPI';
import { IssueEntry, returnEntry } from '../Users/usersSlice';
 
const initialState = {
  status: 'idle',
};


export const fetchaAsync = createAsyncThunk(
  'admins/fetchadmin',
  async () => {
    const response = await fetchAdmin();
    return response.data;
  }
);

export const fetchsync = createAsyncThunk(
  'admins/fetchadminid',
  async () => {
    const users = await fetchallUser();
    const response = await fetchAdmin();
    return {admin: response.data, users: users.data};
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

export const confirmAsync = createAsyncThunk(
  'admins/confirm',
  async (action) => {
    const {data} = await fetchUsers(action.user.id);
    const admin = await fetchAdmin();
    await updateuserPatch({id: action.user.id, change: {
      messages: [...data.messages, {messageid: data.latestMessage+1, ...action.message}],
      latestMessage: data.latestMessage+1,
      booksrequested: [...data.booksrequested.filter(ele=>ele.bookid !== action.request.book), {...data.booksrequested.find(ele=>ele.bookid === action.request.book), replied: true}]
    }})
    const response = await updatePatch({
      requests: admin.data.requests.filter(ele => ele.reqid !== action.request.reqid)
    })
    return response.data;
  }
);

export const sendAsync = createAsyncThunk(
  'admins/sendmessage',
  async (action) =>{
    const {data} = await fetchUsers(action.user.id);
    const userupdated = await updateuserPatch({id: action.user.id, change: {messages: [...data.messages, {messageid: data.latestMessage+1, type: action.message.type, message: action.message.message}],latestMessage: data.latestMessage+1}})
  }
)

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
      .addCase(fetchaAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchaAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(fetchsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(sendAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendAsync.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(confirmAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(confirmAsync.fulfilled, (state, action) => {
        state.data = undefined;
        state.status = 'idle';
        state.data = action.payload;
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
