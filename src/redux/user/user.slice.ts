import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUSER } from '../../types/typeUser';

const initialState = {
  listUser: [] as TUSER[],
};
export const fetchListUser = createAsyncThunk(
  'users/fetchListUser',
  async (userId, thunkAPI) => {
    const response = await fetch('http://localhost:8000/users');
    const data = await response.json();
    return data as TUSER[];
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchListUser.fulfilled, (state, action) => {
      // Add user to the state array
      state.listUser = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
// export const {} = userSlice.actions;

export default userSlice.reducer;
