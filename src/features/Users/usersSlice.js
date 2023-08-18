import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUser, fetchUsers, fetchallUser, updatePut, updateUser, updateuserPatch } from './usersAPI';
import { fetchAdmin, updatePatch} from '../Admin/adminsAPI';
import bcrypt from 'bcryptjs';

const initialState = {
  user: {id: -1},
  status: 'idle',
  page: 1
};

function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const createUser = createAsyncThunk(
  'users/createuser',
  async (action) => {
    const dt = new Date();
    const {data} = await fetchUser();
    const pass = await bcrypt.hash(action.user.password, 13);
    await updateUser(data.userCount+1, {
      booksissued: [],
      booksrequested: [],
      messages: [],
      id: data.userCount+1,
      timestamp: dt.toISOString(),
      latestissue: 0,
      latestquery: 0,
      latestMessage: 0,
      name: action.user.username,
      img: '',
      email: action.user.email,
      password: pass,
      phone: "NAN",
      Totfine: 0,
      latestissuedate: ""
    })
    const response = await fetchUsers(data.userCount+1);
    return response.data;
  }
)

export const setDetails = createAsyncThunk(
  'users/setdetuser',
  async (action) => {
    const response = await updateuserPatch(action);
    return response.data;
  }
);

export const Compare = createAsyncThunk(
  'users/compareuser',
  async (action) => {
    if(action.user.username === 'admin' && action.user.password === 'admin12'){
      const {data} = await fetchAdmin();
      return data;
    }
    else{
      const {data} = await fetchallUser()
      for(let i=1; i<data.length; i++){
        let e = false;
        if(data[i].password !== undefined){
          if(data[i].name === action.user.username){
            e = await bcrypt.compare(action.user.password, data[i].password);
            if(e === true) {
              return {code: 2, user: data[i]};
            }
          }
        }
      }
    }
    return {code: 1, error: "Invalid Credentials"}
  }
);

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
    const response = await updateuserPatch({id: action.user.id, change: {latestissuedate: dt.toISOString(), booksrequested: [...action.user.booksrequested, {
      queryid: action.user.latestquery+1,
      bookid: action.book.id,
      issueddate: dt.toISOString().split('T')[0],
      type: action.type
    }], latestquery: action.user.latestquery+1}});
    return response.data;
  }
);

export const IssueEntry = createAsyncThunk(
  'users/issueEntry',
  async (action) => {
    const dt = new Date();
    const response = await updateuserPatch({id: action.user.id, change: {
      latestissuedate: dt.toISOString(), 
      booksissued: [...action.user.booksissued, {
        queryid: action.user.latestissue+1,
        bookid: action.bookid,
        issueddate: dt.toISOString().split('T')[0],
        returndate: addDays(dt, 15).toISOString().split('T')[0]
      }], 
      latestissue: action.user.latestissue+1,
      booksrequested: action.user.booksrequested.filter(ele => ele.bookid !== action.bookid)
  }});
  console.log(response.data);
  }
);

export const returnEntry = createAsyncThunk(
  'users/returnEntry',
  async (action) => {
    const dt = new Date();
    const response = await updateuserPatch({id: action.user.id, change: {
      latestissuedate: dt.toISOString(), 
      booksissued: action.user.booksissued.filter(ele => ele.bookid !== action.bookid),
      booksrequested: action.user.booksrequested.filter(ele => ele.bookid !== action.bookid)
  }});
    console.log(response.data);
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
    Logout: (state, action) => {
      state.user = {id: -1}
      state.page = 1;
    },
    Dashboard: (state, action) => {
      state.page = 4;
    },
    Homeredirect: (state, action) => {
      state.page = 2;
    },
    Books: (state, action) => {
      state.page = 3;
    },
    Admin: (state, action) => {
      state.page = 5;
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
      .addCase(IssueEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(IssueEntry.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload
      })
      .addCase(returnEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(returnEntry.fulfilled, (state, action) => {
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
      .addCase(Compare.pending, (state) => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(Compare.fulfilled, (state, action) => {
        state.status = 'idle';
        if(action.payload.code === 1){
          state.error = action.payload.error
        }
        else {
          state.user = action.payload.user;
          state.page = 2;
          state.error = undefined;
        }
      })
      .addCase(setDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setDetails.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
        state.page = 2;
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

export const {getFine, removeIssued, incrementIssuedBooks, Admin, Homeredirect, Dashboard, Books, incrementQueriedBooks, Logout } = usersSlice.actions;

export default usersSlice.reducer;
