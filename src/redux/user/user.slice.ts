import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUSER } from '../../types/typeUser';

const initialState = {
  listUser: [] as TUSER[],
  isCreaeSuccess: false,
};
export const fetchListUser = createAsyncThunk(
  'users/fetchListUser',
  async () => {
    const response = await fetch('http://localhost:8000/users');

    const data = await response.json();
    return data as TUSER[];
  },
);
interface IUserPayload {
  name: string;
  email: string;
}
export const createNewUser = createAsyncThunk(
  'users/createNewUser',

  async (payload: IUserPayload, thunkAPI) => {
    const response = await fetch('http://localhost:8000/users', {
      method: 'Post',
      body: JSON.stringify({ ...payload }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data as TUSER[];
  },
);
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (payload: TUSER, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        email: payload.email,
        name: payload.name,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data && data.id) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data as TUSER[];
  },
);
export const deleteUser = createAsyncThunk(
  'users/updateUser',
  async (payload: TUSER, thunkAPI) => {
    const response = await fetch(`http://localhost:8000/users/${payload.id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data) {
      thunkAPI.dispatch(fetchListUser());
    }
    return data as TUSER[];
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetCreate(state) {
      state.isCreaeSuccess = false;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUser = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state) => {
      // Add user to the state array
      state.isCreaeSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreate } = userSlice.actions;

export default userSlice.reducer;
