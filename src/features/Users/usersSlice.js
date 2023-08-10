import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUsers, updatePut, updateuserPatch } from './usersAPI';

const initialState = {
  user: {id: -1},
  status: 'idle',
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}


export const fetchuAsync = createAsyncThunk(
  'users/fetchuser',
  async (id) => {
    const response = await fetchUsers(id);
    return response.data;
  }
);

export const removeAsync = createAsyncThunk(
  'users/removeIssue',
  async (action) => {
    const response = await updateuserPatch(action);
    return response.data;
  }
);

export const returnAsync = createAsyncThunk(
  'users/returnIssue',
  async (action) => {
    console.log(action)
    let dt = new Date();
    const response = await updateuserPatch({id: action.user.id, change: {latestquery: action.user.latestquery+1, booksrequested: [...action.user.booksrequested, {
      queryid: action.user.latestquery+1,
      bookid: action.book.id,
      issueddate: dt.toISOString().split('T')[0],
      type: action.type
    }], latestissuedate: dt.toISOString()}});
    return response.data;
  }
);

export const fineAsync = createAsyncThunk(
  'users/fineUpdate',
  async (action) => {
    let e = 0;
    const dt = new Date();
    action.booksissued.forEach(element => {
      if(new Date(element.returndate) < dt){
        const diff = Math.ceil(Math.abs(new Date(element.returndate) - dt) / (1000 * 60 * 60 * 24) );
        if(diff < 15){
          e += diff*2;
        }else if(diff < 30){
          e += diff*3;
        }else{
          e += diff*10;
        }
      }
    });
    const response = await updateuserPatch({id: action.id, change: {Totfine: e, timestamp: dt.toISOString()}});
    return response.data;
  }
);

export const IssueUpdate = createAsyncThunk(
  'users/issueUpdate',
  async (action) => {
    const dt = new Date();
    console.log(action);
    const response = await updateuserPatch({id: action.user.id, change: {latestissuedate: dt.toISOString(), booksrequested: [...action.user.booksrequested, {
      queryid: action.user.latestquery+1,
      bookid: action.book.id,
      issueddate: dt.toISOString().split('T')[0],
      type: action.type
    }], latestquery: action.user.latestquery+1}});
    return response.data;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getFine: (state) => {
      let e = 0;
      const dt = new Date();
      state.user.booksissued.forEach(element => {
        if(new Date(element.returndate) < dt){
          const diff = Math.ceil(Math.abs(new Date(element.returndate) - dt) / (1000 * 60 * 60 * 24) );
          if(diff < 15){
            e += diff*2;
          }else if(diff < 30){
            e += diff*3;
          }else{
            e += diff*10;
          }
        }
      });
      state.user.Totfine = e;
    },
    removeIssued: (state, action) => {
      state.user.booksissued = state.user.booksissued.filter(ele => ele.issueid !== Number(action.payload))
    },
    incrementIssuedBooks: (state, action) => {
      let dt = new Date();
      state.user.latestissue += 1;
      state.user.booksissued.push({
        issueid: state.user.latestissue,
        bookid: action.payload.book.id,
        issueddate: dt.toISOString().split('T')[0],
        returndate: addDays(dt, 15).toISOString().split('T')[0]
      })
    },
    incrementQueriedBooks: (state, action) => {
      let dt = new Date();
      state.user.latestquery += 1;
      state.user.booksrequested.push({
        queryid: state.user.latestquery,
        bookid: action.payload.book.id,
        issueddate: dt.toISOString().split('T')[0],
        type: action.payload.type
      })
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
      })
      .addCase(fineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fineAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload
      })
      .addCase(IssueUpdate.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(IssueUpdate.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload
      })
      .addCase(returnAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(returnAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload
      })
      .addCase(removeAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload
      });
  },
});

export const {getFine, removeIssued, incrementIssuedBooks, incrementQueriedBooks } = usersSlice.actions;

export default usersSlice.reducer;
